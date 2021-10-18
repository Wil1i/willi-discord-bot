const { WebhookClient, MessageEmbed } = require("discord.js");
const db = require("quick.db");
const guildConfig = require("../configItems/guild");

module.exports = {
  name: "guildDelete",
  description: "Handle when role deleted",
  execute(client, role) {
    if (!db.has(`role_${role.guild.id}`)) return;

    let Entry = NaN;
    try {
      const AuditLogFetch = await role.guild.fetchAuditLogs({
        limit: 1,
        type: "ROLE_DELETE",
      });
      Entry = AuditLogFetch.entries.first();
    } catch {}

    const config = guildConfig.get(client, role.guild);
    const webhookURL = db.get(`role_${role.guild.id}`);
    const webhook = new WebhookClient({ url: webhookURL });
    const embed = new MessageEmbed()
      .setColor(config.color)
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .setDescription(
        `**Role ${role.name} deleted by ${Entry.executor || "Peyda Nashod."}**`
      )
      .setAuthor(`Role Deleted`, role.guild.iconURL({ dynamic: true }));

    webhook.send({
      username: client.user,
      avatarURL: client.user.displayAvatarURL(),
      embeds: [embed],
    });
  },
};
