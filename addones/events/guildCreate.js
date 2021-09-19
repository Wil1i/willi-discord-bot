const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "guildCreate",
  description: "Handle when bot added to a server",
  execute(client, guild) {
    if (!db.has(`guildInfo`)) return;

    const color = db.get("color");
    const findOwner = client.users.cache.get(guild.ownerId);
    const webhookURL = db.get(`guildInfo`);
    const webhook = new Discord.WebhookClient({ url: webhookURL });
    const embed = new Discord.MessageEmbed()

      .setColor(color)
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .setAuthor(guild.name, guild.iconURL())
      .setDescription(
        `Bot ${client.user.username} added to server **${guild.name}**.\n\nServer owner is **${findOwner.username}#${findOwner.discriminator}** (<@${findOwner.id}>) and server have **${guild.memberCount}** memebrs`
      )
      .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }));

    webhook.send({
      username: client.user.username,
      avatarURL: client.user.displayAvatarURL(),
      embeds: [embed],
    });
  },
};
