const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "emojiUpdate",
  description: "Handle when a emoji updated",
  async execute(client, oldEmoji, newEmoji) {
    if (!db.has(`emojiUpdate_${newEmoji.guild.id}`)) return;

    let emojiAddress;
    if (newEmoji.animated) {
      emojiAddress = `<a:${newEmoji.name}:${newEmoji.id}>`;
    } else {
      emojiAddress = `<:${newEmoji.name}:${newEmoji.id}>`;
    }

    let Entry = NaN;
    try {
      const AuditLogFetch = await newEmoji.guild.fetchAuditLogs({
        limit: 1,
        type: "EMOJI_UPDATE",
      });
      Entry = AuditLogFetch.entries.first();
    } catch {}

    let color = db.get("color");
    if (db.has(`color_${newEmoji.guild.id}`))
      color = db.get(`color_${newEmoji.guild.id}`);

    const webhookURL = db.get(`emojiUpdate_${newEmoji.guild.id}`);
    const webhook = new Discord.WebhookClient({ url: webhookURL });
    const embed = new Discord.MessageEmbed()
      .setColor(color)
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .setAuthor(newEmoji.guild.name, newEmoji.guild.iconURL());

    if (oldEmoji.name !== newEmoji.name) {
      embed.setDescription(
        emojiAddress +
          " **Name For Emoji `" +
          newEmoji.name +
          "`" +
          ` Updated.**\n\n**Old Name** : ${oldEmoji.name}\n**New Emoji** : ${newEmoji.name}\n**Executor** : ${Entry.executor}`
      );

      webhook.send({
        username: client.user.username,
        avatarURL: client.user.displayAvatarURL(),
        embeds: [embed],
      });
    }
  },
};
