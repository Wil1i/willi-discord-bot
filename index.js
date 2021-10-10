// Import librarys, install this librarys usng "npm install" in this directory
const { green, red, yellow } = require("chalk");
console.log(
  red(`[CONFIG]`),
  green("Importing librarys and config first files...")
);

const Discord = require("discord.js");
const config = require("./config.json");
const fs = require("fs");
const db = require("quick.db");

// Create client with some intents
const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS, // Can see guilds
    Discord.Intents.FLAGS.GUILD_MESSAGES, // Can see messages in guild
    Discord.Intents.FLAGS.GUILD_MEMBERS, // Can see members in guild
    Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, // Can see emojis and stickers
    Discord.Intents.FLAGS.GUILD_BANS, // Can see bans
    Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
  ],
});

// Commands and events and components collection help us to manage our commands, events and components
client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.components = new Discord.Collection();

// Open directory for commands and...
const commandsFile = fs
  .readdirSync("./addones/commands")
  .filter((file) => file.endsWith(".js"));
const eventsFile = fs
  .readdirSync("./addones/events")
  .filter((file) => file.endsWith(".js"));
const componentsFile = fs
  .readdirSync("./addones/components")
  .filter((file) => file.endsWith(".js"));

// Registered and problem things (when bot is ready it's going to work)
let registeredCommands = 0;
let registeredEvents = 0;
let registerComponents = 0;

let problemCommands = 0;
let problemEvents = 0;
let problemComponents = 0;

// Register commands, events and components
for (const command of commandsFile) {
  const rCommand = require(`./addones/commands/${command}`);
  if (rCommand.execute && rCommand.name) {
    client.commands.set(rCommand.name, rCommand);
    console.log(
      red(`[REGISTERING]`),
      green(`Command `),
      red(rCommand.name),
      green(" Registered")
    );
    registeredCommands++;
  } else {
    console.log(
      red(`[REGISTRING]`),
      yellow(`Can't register `),
      red(command),
      yellow(` command`)
    );
    problemCommands++;
  }
}

console.log(
  red(`[REGISTERING]`),
  green(`Successfully registered `),
  red(registeredCommands),
  green(" commands and "),
  red(problemCommands),
  green(" problems found")
);

for (const event of eventsFile) {
  const rEvent = require(`./addones/events/${event}`);
  if (rEvent.execute && rEvent.name) {
    client.events.set(rEvent.name, rEvent);
    console.log(
      red(`[REGISTERING]`),
      green(`Event `),
      red(rEvent.name),
      green(" Registered")
    );
    registeredEvents++;
  } else {
    console.log(red(`[REGISTRING]Can't register ${event} event`));
    problemEvents++;
  }
}
console.log(
  red(`[REGISTERING]`),
  green(`Successfully registered `),
  red(registeredEvents),
  green(" events and "),
  red(problemEvents),
  green(" problems found")
);

for (const comp of componentsFile) {
  const rComp = require(`./addones/components/${comp}`);
  if (rComp.execute && rComp.name) {
    client.components.set(rComp.name, rComp);
    console.log(
      red(`[REGISTERING]`),
      green(`Component Response `),
      red(rComp.name),
      green(" Registered")
    );
    registerComponents++;
  } else {
    console.log(red(`[REGISTRING]Can't register ${comp} component response`));
    problemComponents++;
  }
}
console.log(
  red(`[REGISTERING]`),
  green(`Successfully registered `),
  red(registerComponents),
  green(" component response and "),
  red(problemComponents),
  green(" problems found")
);
console.log("\n");

client.on("ready", () => {
  client.events.get("ready").execute(client);
});

client.login(config.token);

// Message handler
client.on("messageCreate", (message) => {
  // For each message prefix updated (bc when prefix update)
  let prefix = config.defPrefix;
  if (db.has(`prefix_${message.guild.id}`)) {
    prefix = db.get(`prefix_${message.guild.id}`);
  } else if (db.has(`prefix`)) {
    prefix = db.get(`prefix`);
  }

  // for this line, bots can't use commands and user can't use commands in DM of bot
  if (
    !message.content.startsWith(prefix) ||
    message.author.bot ||
    message.channel.type == "DM"
  )
    return;

  const messageArry = message.content.split(" ");
  const command = messageArry[0].replace(prefix, "");

  // Check if command is available
  if (!client.commands.has(command)) return;

  console.log(
    red(`[CMD]`),
    green("User "),
    red(message.author.tag),
    green(` => `),
    red(command)
  ); // Log commmand in console

  const commandDetail = client.commands.get(command);

  // if user is developer of bot, command going to run without any rules
  if (message.author.id == config.developerID)
    return commandDetail.execute(client, message);

  // when command is private is only use for developers
  if (commandDetail.private) return;

  // If command have permission
  if (commandDetail.permission) {
    const hasPermission = require("./addones/configItems/permission").get(
      message,
      commandDetail.permission.toUpperCase()
    );
    if (!hasPermission) return;
  }

  // If command have rank
  if (commandDetail.rank && !db.has(`rank_${message.author.id}`)) return;

  const rank = db.get(`rank_${message.author.id}`);

  if (
    commandDetail.rank &&
    commandDetail.rank == "administrator" &&
    rank !== "administrator"
  )
    return;
  if (
    commandDetail.rank &&
    commandDetail.rank == "admin" &&
    rank !== "administrator" &&
    rank !== "admin"
  )
    return;

  commandDetail.execute(client, message);
});

// Interaction handler
client.on("interactionCreate", async (interaction) => {
  if (interaction.isMessageComponent) {
    if (!client.components.has(interaction.customId)) return;
    client.components.get(interaction.customId).execute(client, interaction);
  }
});

// All Events (need event handler)
client.on("guildMemberAdd", (member) => {
  client.events.get("guildMemberAdd").execute(client, member);
});

client.on("guildMemberRemove", (member) => {
  client.events.get("guildMemberRemove").execute(client, member);
});

client.on("channelCreate", (channel) => {
  client.events.get("channelCreate").execute(client, channel);
});

client.on("channelDelete", (channel) => {
  client.events.get("channelDelete").execute(client, channel);
});

client.on("channelPinsUpdate", (channel, time) => {
  client.events.get("channelPinsUpdate").execute(client, channel, time);
});

client.on("channelUpdate", (oldChannel, newChannel) => {
  client.events.get("channelUpdate").execute(client, oldChannel, newChannel);
});

client.on("emojiCreate", (emoji) => {
  client.events.get("emojiCreate").execute(client, emoji);
});

client.on("emojiDelete", (emoji) => {
  client.events.get("emojiDelete").execute(client, emoji);
});

client.on("emojiUpdate", (oldEmoji, newEmoji) => {
  client.events.get("emojiUpdate").execute(client, oldEmoji, newEmoji);
});

client.on("guildBanAdd", (member) => {
  client.events.get("guildBanAdd").execute(client, member);
});

client.on("guildBanRemove", (member) => {
  client.events.get("guildBanRemove").execute(client, member);
});

client.on("guildCreate", (guild) => {
  client.events.get("guildCreate").execute(client, guild);
});

client.on("guildDelete", (guild) => {
  client.events.get("guildDelete").execute(client, guild);
});

client.on("messageDelete", (message) => {
  client.events.get("messageDelete").execute(client, message);
});

// client.on("roleCreate")
// client.on("roleDelete")
// client.on("roleUpdate")
// client.on("guildMemberUpdate")
// client.on("guildUpdate")
// client.on("voiceStateUpdate")
// client.on("userUpdate")
// client.on("stickerCreate")
// client.on("stickerDelete")
// client.on("stickerUpdate")
// client.on("threadCreate")
// client.on("threadDelete")
// client.on("threadListSync")
// client.on("threadMemberUpdate")
// client.on("threadMembersUpdate")
// client.on("threadUpdate")
// client.on("webhookUpdate")
// client.on("inviteCreate")
// client.on("inviteDelete")
// client.on("guildMembersChunk")
// client.on("invalidRequestWarning")
// client.on("invalidated")
// client.on("messageDeleteBulk")
// client.on("messageUpdate")
// client.on("rateLimit")
// client.on("stageInstanceCreate")
// client.on("stageInstanceDelete")
// client.on("stageInstanceUpdate")
