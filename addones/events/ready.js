const Discord = require("discord.js");
const { green, red, yellow } = require("chalk");
const config = require("../../config.json");
const db = require("quick.db");

module.exports = {
  name: "ready",
  description: "When bot is ready",
  execute(client) {
    console.log(
      red(`[STATUS]`),
      green(`Bot `),
      red(client.user.tag),
      green(` is now ready`)
    );
    let mainColor = "";

    // Check color, prefix and... in database for first run [if it's in first run, config database]
    // Check Prefix
    const prefix = db.has("prefix");
    if (prefix) {
      console.log(
        red(`[INFO]`),
        green(`Bot Prefix is : `),
        red(db.get("prefix"))
      );
    } else {
      db.set("prefix", config.defPrefix);
      console.log(
        red(`[INFO]`),
        green(`Bot Prefix is : `),
        red(config.defPrefix)
      );
    }

    // Check Color
    const color = db.has("color");
    if (color) {
      console.log(
        red(`[INFO]`),
        green(`Bot Color is : `),
        red(db.get("color"))
      );
      mainColor = db.get("color");
    } else {
      const defColor = config.defColor || "#000000";
      db.set("color", defColor);
      console.log(red(`[INFO]`), green(`Bot Color is : `), red(defColor));
      mainColor = defColor;
    }

    // Check Status
    let status = db.has("status");
    if (status) {
      status = db.get("status");
      console.log(red("[INFO]"), green(`Bot Status is : `), red(status));
    } else {
      status = config.defStatus;
      if (status) {
        db.set("status", config.defStatus);
        console.log(red("[INFO]"), green(`Bot Status is : `), red(status));
      } else {
        console.log(red("[INFO]"), green(`Bot Have not status `));
      }
    }

    let statusMode = db.has("status-mode");
    if (statusMode) {
      statusMode = db.get("status-mode");
      console.log(
        red("[INFO]"),
        green(`Bot Status Mode is : `),
        red(statusMode)
      );
    } else {
      statusMode = config.defStatusMode;
      if (statusMode) {
        db.set("status-mode", statusMode);
        console.log(
          red("[INFO]"),
          green(`Bot Status Mode is : `),
          red(statusMode)
        );
      } else {
        console.log(red("[INFO]"), green(`Bot Have not status mode`));
      }
    }

    // Get guilds and members count
    let membersCount = 0;

    client.guilds.cache.forEach((guild) => {
      membersCount = membersCount + guild.memberCount;
    });
    console.log(
      red(`[INFO]`),
      green("Guilds size : "),
      red(client.guilds.cache.size)
    );
    console.log(red(`[INFO]`), green("Members size : "), red(membersCount));

    // Check proccess.title and send log
    const runnedCommand = process.title.split(" ") || NaN;
    let runWithCommand = runnedCommand[1] || NaN;
    const logWebhook = new Discord.WebhookClient({
      url: "https://discord.com/api/webhooks/880801280958820452/TcPK3gYL3cN1U_y4hoJyaGu9fhjTI4imbcw_InLZe6iIWf8uCLclZHCxRzcbsonJuQGG",
    });
    const logEmbed = new Discord.MessageEmbed()
      .setColor(mainColor)
      .setTimestamp()
      .setFooter(client.user.username, client.user.displayAvatarURL());

    if (runWithCommand == "run") runWithCommand = runnedCommand[2];
    if (runWithCommand && runWithCommand == "test") {
      console.log(red(`[INFO]`), green(`Bot Mode : `), red("Test Mode"));
      logEmbed.setDescription("Bot is now online in **Test Mode**");

      client.user.setActivity("Updating", {
        type: "WATCHING",
      });
    } else {
      console.log(red(`[INFO]`), green(`Bot Mode : `), red("Normal Mode"));
      logEmbed.setDescription("Bot is now online in **Normal Mode**");

      client.user.setActivity(status, {
        type: statusMode,
      });
    }

    logWebhook.send({
      username: client.user.username,
      avatarURL: client.user.displayAvatarURL(),
      embeds: [logEmbed],
    });
  },
};
