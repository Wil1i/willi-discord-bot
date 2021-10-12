const guildConfig = require("../configItems/guild");
const db = require("quick.db");
const { MessageEmbed } = require("discord.js");

// ?mute @usermention reason

module.exports = {
  name: "mute",
  description: "Test command",
  permission: "manage_messages",
  array: "[Mention] [Reason]",
  execute(client, message) {
    message.delete();
    const config = guildConfig.get(client, message.guild);
    const color = config.color;
    const prefix = config.prefix;

    const messageArry = message.content.split(" ");
    const userMention = message.mentions.users.first();

    const muteEmbed = new MessageEmbed()
      .setColor(color)
      .setFooter(client.user.username, client.user.displayAvatarURL());

    if (messageArry[1] && userMention) {
      const isUserMute = db.has(`mute.${userMention.id}`);
      const reason = message.content.replace(
        `${messageArry[0]} ${messageArry[1]}`,
        ""
      );
      if (!isUserMute) {
        if (messageArry[2]) {
          db.set(`mute.${userMention.id}`, {
            author: message.author.id,
            reason: reason,
          });
          muteEmbed
            .setDescription(
              `User <@${userMention.id}> muted by <@${message.author.id}>\n\n**Reason**: ${reason}`
            )
            .setAuthor(
              `${userMention.username} Muted`,
              userMention.displayAvatarURL({ dynamic: true })
            );
        } else {
          muteEmbed.setDescription(
            `**SYNTAX**: ${prefix}${this.name} ${this.array}`
          );
        }
      } else {
        db.delete(`mute.${userMention.id}`);
        muteEmbed.setDescription(
          `User <@${userMention.id}> is unmuted by <@${message.author.id}>`
        );
      }
    } else {
      muteEmbed.setDescription(
        `**SYNTAX**: ${prefix}${this.name} ${this.array}`
      );
    }
    message.channel.send({ embeds: [muteEmbed] });
  },
};
