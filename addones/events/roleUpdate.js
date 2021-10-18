const { WebhookClient, MessageEmbed } = require("discord.js");
const db = require("quick.db");
const guildConfig = require("../configItems/guild");

module.exports = {
  name: "roleUpdate",
  description: "Handle when a role changed",
  execute(client, oldRole, newRole) {
    if (!db.has(`role_${newRole.guild.id}`)) return;
    let sendable = false;

    let Entry = NaN;
    try {
      const AuditLogFetch = await newRole.guild.fetchAuditLogs({
        limit: 1,
        type: "ROLE_UPDATE",
      });
      Entry = AuditLogFetch.entries.first();
    } catch {}

    const config = guildConfig.get(client, newRole.guild);
    const webhookURL = db.get(`role_${newRole.guild.id}`);
    const webhook = new WebhookClient({ url: webhookURL });
    const embed = new MessageEmbed()
      .setColor(config.color)
      .setFooter(`Updated by ${Entry.executor.username}`)
      .setAuthor(`Role Updated`, newRole.guild.iconURL({ dynamic: true }));

    //   It means role permissions changed
    if (oldRole.permissions !== newRole.permissions) {
      const oldPerms = oldRole.serialize();
      const newPerms = newRole.serialize();

      const updatedPerms = [];

      for (const [key, element] of Object.entries(oldPerms)) {
        if (newPerms[key] !== element) updatedPerms.push(key);
      }

      //   It means permission lost
      if (oldRole.permissions > newRole.permissions) {
        embed.setDescription(
          `**${newRole.toString()} has lost the ${permUpdated.join(
            ", "
          )} permission**`
        );
        sendable = true;
      }

      //   It means permission given
      if (oldRole.permissions < newRole.permissions) {
        embed.setDescription(
          `**${newRole.toString()} has given the ${permUpdated.join(
            ", "
          )} permission**`
        );
        sendable = true;
      }

      //   It means role name changed
      if (oldRole.name !== newRole.name) {
        embed
          .addField(`Old Name`, oldRole.name, true)
          .addField(`New Name`, newRole.name, true);
        sendable = true;
      }

      if (sendable)
        webhook.send({
          username: client.user.username,
          avatarURL: client.user.displayAvatarURL(),
          embeds: [embed],
        });
    }
  },
};
