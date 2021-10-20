const { WebhookClient, MessageEmbed } = require("discord.js");
const db = require("quick.db");
const guildConfig = require("../configItems/guild");

module.exports = {
  name: "roleCreate",
  description: "Handle when a role created",
  async execute(client, role) {
    if (!db.has(`role_${role.guild.id}`)) return;

    let Entry = NaN;
    try {
      const AuditLogFetch = await role.guild.fetchAuditLogs({
        limit: 1,
        type: "ROLE_CREATE",
      });
      Entry = AuditLogFetch.entries.first();
    } catch {}

    const rolePermissions = role.permissions.toArray().join("\n");
    const config = guildConfig.get(client, role.guild);
    const webhookURL = db.get(`role_${role.guild.id}`);
    const webhook = new WebhookClient({ url: webhookURL });
    const embed = new MessageEmbed()
      .setColor(config.color)
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .setAuthor(`Role Created`, role.guild.iconURL({ dynamic: true }))
      .setDescription(
        `**Role ${role.name} created**\n\n**Created by**: ${
          Entry.executor || "Peyda Nashod."
        }\n**Permissions**:\n${rolePermissions}`
      );

    webhook.send({
      username: client.user.username,
      avatarURL: client.user.displayAvatarURL(),
      embeds: [embed],
    });
  },
};
