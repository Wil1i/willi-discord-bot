const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "guildBanRemove",
  description: "Handle when a user removed from ban (UnBanned)",
  async execute(client, member) {
    if (!db.has(`banRemove_${member.guild.id}`)) return;

    let Entry = NaN;
    try {
      const AuditLogFetch = await member.guild.fetchAuditLogs({
        limit: 1,
        type: "MEMBER_BAN_REMOVE",
      });
      Entry = AuditLogFetch.entries.first();
    } catch {}

    let color = db.get("color");
    if (db.has(`color_${member.guild.id}`))
      color = db.get(`color_${member.guild.id}`);

    const webhookURL = db.get(`banRemove_${member.guild.id}`);
    const webhook = new Discord.WebhookClient({ url: webhookURL });
    const embed = new Discord.MessageEmbed()
      .setColor(color)
      .setAuthor(member.guild.name, member.guild.iconURL())
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .setDescription(
        `**User ` +
          "`" +
          member.user.tag +
          "`" +
          ` UnBanned from the server.**\n\n**Executor** : ${Entry.executor}`
      );

    webhook.send({
      username: client.user.username,
      avatarURL: client.user.displayAvatarURL(),
      embeds: [embed],
    });
  },
};
