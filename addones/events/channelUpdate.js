const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "channelUpdate",
  description: "Handle when a channel update anything",
  async execute(client, oldChannel, newChannel) {
    if (!db.has(`channelUpdate_${newChannel.guild.id}`)) return;

    let Entry = NaN;
    try {
      const AuditLogFetch = await newChannel.guild.fetchAuditLogs({
        limit: 1,
        type: "CHANNEL_UPDATE",
      });
      Entry = AuditLogFetch.entries.first();
    } catch (error) {}

    let color = db.get("color");
    if (db.has(`color_${newChannel.guild.id}`))
      color = db.get(`color_${newChannel.guild.id}`);

    const webhookURL = db.get(`channelUpdate_${newChannel.guild.id}`);
    const webhook = new Discord.WebhookClient({ url: webhookURL });
    const embed = new Discord.MessageEmbed()
      .setColor(color)
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .setAuthor(newChannel.guild.name, newChannel.guild.iconURL());

    if (oldChannel.name !== newChannel.name) {
      embed.setDescription(
        `**Name for channel <#${newChannel.id}> has been updated.**\n\n**Old Name** : ${oldChannel.name}\n**New Name** : ${newChannel.name}\n**Executor** : ${Entry.executor}`
      );

      webhook.send({
        username: client.user.username,
        avatarURL: client.user.displayAvatarURL(),
        embeds: [embed],
      });
    }

    if (!oldChannel.nsfw && newChannel.nsfw) {
      embed.setDescription(
        `**NSFW Mode for channel <#${newChannel.id}> enbaled**\n**Executor** : ${Entry.executor}`
      );

      webhook.send({
        username: client.user.username,
        avatarURL: client.user.displayAvatarURL(),
        embeds: [embed],
      });
    }

    if (oldChannel.nsfw && !newChannel.nsfw) {
      embed.setDescription(
        `**NSFW Mode for channel <#${newChannel.id}> disabled**\n**Executor** : ${Entry.executor}`
      );

      webhook.send({
        username: client.user.username,
        avatarURL: client.user.displayAvatarURL(),
        embeds: [embed],
      });
    }

    if (oldChannel.topic !== newChannel.topic) {
      embed.setDescription(
        `**Topic for channel <#${newChannel.id}> has been updated**\n\n**Old Topic** : ${oldChannel.topic}\n**New Topic** : ${newChannel.topic}\n**Executor** : ${Entry.executor}`
      );

      webhook.send({
        username: client.user.username,
        avatarURL: client.user.displayAvatarURL(),
        embeds: [embed],
      });
    }

    if (oldChannel.rawPosition !== newChannel.rawPosition) {
      embed.setDescription(
        `**Raw Position for channel <#${newChannel.id}> has been updated.\n\n**Old Raw** : ${oldChannel.rawPosition}\n**New Raw** : ${newChannel.rawPosition}\n**Executor** : ${Entry.executor}`
      );

      webhook.send({
        username: client.user.username,
        avatarURL: client.user.displayAvatarURL(),
        embeds: [embed],
      });
    }

    if (
      oldChannel.defaultAutoArchiveDuration !==
      newChannel.defaultAutoArchiveDuration
    ) {
      embed.setDescription(
        `**Auto Archive Duration for channel <#${newChannel.id}> has been updated**\n\n**Old Duration** : ${oldChannel.defaultAutoArchiveDuration} Minutes\n**New Duration** : ${newChannel.defaultAutoArchiveDuration} Minutes\n**Executor** : ${Entry.executor}`
      );

      webhook.send({
        username: client.user.username,
        avatarURL: client.user.displayAvatarURL(),
        embeds: [embed],
      });
    }

    if (oldChannel.rateLimitPerUser !== newChannel.rateLimitPerUser) {
      let oldTime = oldChannel.rateLimitPerUser;
      let newTime = newChannel.rateLimitPerUser;

      if (oldTime == 0) oldTime = "OFF";
      if (newTime == 0) newTime = "OFF";

      embed.setDescription(
        `**Slow Mode for channel <#${newChannel.id}> has been updated.**\n\n**Old Limit** : ${oldTime}\n**New Limit** : ${newTime}\n**Executor** : ${Entry.executor}`
      );

      webhook.send({
        username: client.user.username,
        avatarURL: client.user.displayAvatarURL(),
        embeds: [embed],
      });
    }

    if (oldChannel.parentId !== newChannel.parentId) {
      embed.setDescription(
        `**Parent ID for channel <#${newChannel.id}> has been updated.\n\n**Old Parent ID** : ${oldChannel.parentId}\n**New Parent ID** : ${newChannel.parentId}\n**Executor** : ${Entry.executor}`
      );

      webhook.send({
        username: client.user.username,
        avatarURL: client.user.displayAvatarURL(),
        embeds: [embed],
      });
    }
  },
};
