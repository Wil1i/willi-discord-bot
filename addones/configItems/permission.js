const Discord = require("discord.js");

module.exports = {
  name: "permission",
  description: "Calculate permissions",
  get(message) {
    const s = {
      ADMINISTRATOR: message.member.permissions.has(
        Discord.Permissions.FLAGS.ADMINISTRATOR
      ),
      BAN_MEMBERS: message.member.permissions.has(
        Discord.Permissions.FLAGS.BAN_MEMBERS
      ),
      MANAGE_MESSAGES: message.member.permissions.has(
        Discord.Permissions.FLAGS.MANAGE_MESSAGES
      ),
      ADD_REACTIONS: message.member.permissions.has(
        Discord.Permissions.FLAGS.ADD_REACTIONS
      ),
      ATTACH_FILES: message.member.permissions.has(
        Discord.Permissions.FLAGS.ATTACH_FILES
      ),
      CHANGE_NICKNAME: message.member.permissions.has(
        Discord.Permissions.FLAGS.CHANGE_NICKNAME
      ),
      CONNECT: message.member.permissions.has(
        Discord.Permissions.FLAGS.CONNECT
      ),
      CREATE_INSTANT_INVITE: message.member.permissions.has(
        Discord.Permissions.FLAGS.CREATE_INSTANT_INVITE
      ),
      DEAFEN_MEMBERS: message.member.permissions.has(
        Discord.Permissions.FLAGS.DEAFEN_MEMBERS
      ),
      EMBED_LINKS: message.member.permissions.has(
        Discord.Permissions.FLAGS.EMBED_LINKS
      ),
      KICK_MEMBERS: message.member.permissions.has(
        Discord.Permissions.FLAGS.KICK_MEMBERS
      ),
      MANAGE_CHANNELS: message.member.permissions.has(
        Discord.Permissions.FLAGS.MANAGE_CHANNELS
      ),
      MANAGE_EMOJIS_AND_STICKERS: message.member.permissions.has(
        Discord.Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS
      ),
      MANAGE_GUILD: message.member.permissions.has(
        Discord.Permissions.FLAGS.MANAGE_GUILD
      ),
      MANAGE_NICKNAMES: message.member.permissions.has(
        Discord.Permissions.FLAGS.MANAGE_NICKNAMES
      ),
      MANAGE_ROLES: message.member.permissions.has(
        Discord.Permissions.FLAGS.MANAGE_ROLES
      ),
      MANAGE_THREADS: message.member.permissions.has(
        Discord.Permissions.FLAGS.MANAGE_THREADS
      ),
      MANAGE_WEBHOOKS: message.member.permissions.has(
        Discord.Permissions.FLAGS.MANAGE_WEBHOOKS
      ),
      MENTION_EVERYONE: message.member.permissions.has(
        Discord.Permissions.FLAGS.MENTION_EVERYONE
      ),
      MOVE_MEMBERS: message.member.permissions.has(
        Discord.Permissions.FLAGS.MOVE_MEMBERS
      ),
      MUTE_MEMBERS: message.member.permissions.has(
        Discord.Permissions.FLAGS.MUTE_MEMBERS
      ),
      PRIORITY_SPEAKER: message.member.permissions.has(
        Discord.Permissions.FLAGS.PRIORITY_SPEAKER
      ),
      READ_MESSAGE_HISTORY: message.member.permissions.has(
        Discord.Permissions.FLAGS.READ_MESSAGE_HISTORY
      ),
      REQUEST_TO_SPEAK: message.member.permissions.has(
        Discord.Permissions.FLAGS.REQUEST_TO_SPEAK
      ),
      SEND_MESSAGES: message.member.permissions.has(
        Discord.Permissions.FLAGS.SEND_MESSAGES
      ),
      SEND_TTS_MESSAGES: message.member.permissions.has(
        Discord.Permissions.FLAGS.SEND_TTS_MESSAGES
      ),
      SPEAK: message.member.permissions.has(Discord.Permissions.FLAGS.SPEAK),
      STREAM: message.member.permissions.has(Discord.Permissions.FLAGS.STREAM),
      USE_APPLICATION_COMMANDS: message.member.permissions.has(
        Discord.Permissions.FLAGS.USE_APPLICATION_COMMANDS
      ),
      USE_EXTERNAL_EMOJIS: message.member.permissions.has(
        Discord.Permissions.FLAGS.USE_EXTERNAL_EMOJIS
      ),
      USE_EXTERNAL_STICKERS: message.member.permissions.has(
        Discord.Permissions.FLAGS.USE_EXTERNAL_STICKERS
      ),
      USE_PRIVATE_THREADS: message.member.permissions.has(
        Discord.Permissions.FLAGS.USE_PRIVATE_THREADS
      ),
      USE_PUBLIC_THREADS: message.member.permissions.has(
        Discord.Permissions.FLAGS.USE_PUBLIC_THREADS
      ),
      USE_VAD: message.member.permissions.has(
        Discord.Permissions.FLAGS.USE_VAD
      ),
      VIEW_AUDIT_LOG: message.member.permissions.has(
        Discord.Permissions.FLAGS.VIEW_AUDIT_LOG
      ),
      VIEW_CHANNEL: message.member.permissions.has(
        Discord.Permissions.FLAGS.VIEW_CHANNEL
      ),
      VIEW_GUILD_INSIGHTS: message.member.permissions.has(
        Discord.Permissions.FLAGS.VIEW_GUILD_INSIGHTS
      ),
    };

    return s;
  },
};
