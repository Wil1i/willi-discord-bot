const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "channelDelete",
  description: "Handle when a channel deleted",
  async execute(client, channel) {
    if (!db.has(`channelDelete_${channel.guild.id}`)) return;

    let color = db.get("color");
    if (db.has(`color_${channel.guild.id}`))
      color = db.get(`color_${channel.guild.id}`);

    let Entry = NaN;
    try {
      const AuditLogFetch = await channel.guild.fetchAuditLogs({
        limit: 1,
        type: "CHANNEL_CREATE",
      });
      Entry = AuditLogFetch.entries.first();
    } catch (error) {}

    let type;
    if (channel.type == "GUILD_VOICE") {
      type = "Voice";
    } else if (channel.type == "GUILD_TEXT") {
      type = "Text";
    } else if (channel.type == "GUILD_NEWS") {
      type = "News";
    } else if (channel.type == "GUILD_NEWS_THREAD") {
      type = "News Thread";
    } else if (channel.type == "GUILD_PRIVATE_THREAD") {
      type = "Private Thread";
    } else if (channel.type == "GUILD_PUBLIC_THREAD") {
      type = "Public Thread";
    }

    const webhookURL = db.get(`channelDelete_${channel.guild.id}`);
    const webhook = new Discord.WebhookClient({ url: webhookURL });
    const embed = new Discord.MessageEmbed()
      .setColor(color)
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .setAuthor(channel.guild.name, channel.guild.iconURL())
      .setDescription(
        "**" +
          type +
          " Channel " +
          "`" +
          channel.name +
          "`" +
          ` Deleted by ${Entry.executor}**`
      );

    webhook.send({
      username: client.user.username,
      avatarURL: client.user.displayAvatarURL(),
      embeds: [embed],
    });
  },
};
