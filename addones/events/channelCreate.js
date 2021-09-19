const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "channelCreate",
  description: "Handle event when a channel created",
  async execute(client, channel) {
    if (!db.has(`channelCreate_${channel.guild.id}`)) return;
    const webhookURL = db.get(`channelCreate_${channel.guild.id}`);

    let color = db.get(`color`);
    if (db.has(`color_${channel.guild.id}`)) {
      color = db.get(`color_${channel.guild.id}`);
    }

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

    const webhook = new Discord.WebhookClient({ url: webhookURL });
    const embed = new Discord.MessageEmbed()
      .setColor(color)
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .setAuthor(channel.guild.name, channel.guild.iconURL())
      .setDescription(
        `🏠 User ${Entry.executor || "No One"} Created ${type} Channel <#${
          channel.id
        }> ` +
          "`" +
          channel.name +
          "`"
      );

    webhook.send({
      username: client.user.username,
      avatarURL: client.user.displayAvatarURL(),
      embeds: [embed],
    });
  },
};
