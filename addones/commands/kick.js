const { MessageEmbed } = require("discord.js");
const guildConfig = require("../configItems/guild");

module.exports = {
  name: "kick",
  description: "Kick a user",
  permission: "kick_members",
  array: "[Mention] [Reason]",
  execute(client, message) {
    message.delete();

    const config = guildConfig.get(client, message.guild);
    const messageArry = message.content.split(" ");
    const userMention = message.mentions.users.first();
    const kickEmbed = new MessageEmbed()
      .setColor(config.color)
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .setAuthor("Kick User");

    // If command have reason and user mentioned another user
    if (messageArry[2] && userMention) {
      const kickReason = message.content.replace(
        `${messageArry[0]} ${messageArry[1]}`,
        ""
      );

      // If user is in server
      const findUser = message.guild.members.cache.get(userMention.id);
      if (findUser) {
        findUser
          .kick({ reason: kickReason })
          .then(() => {
            // User successfully kicked
            kickEmbed.setDescription(
              `User **${userMention.username}** successfully kicked from server.\n\n**kicked by**: <@${message.author.id}>\n**Reason**: ${kickReason}`
            );
          })
          .catch(() => {
            // User not kick (for permission reason)
            kickEmbed.setDescription(`I can't kick ${userMention} user.`);
          });
      } else {
        // Can't find user
        kickEmbed.setDescription(`I can't find user.`);
      }
    } else {
      // Show syntax
      kickEmbed.setDescription(
        `**SYNTAX**: ${config.prefix}${this.name} ${this.array}`
      );
    }
    message.channel.send({ embeds: [kickEmbed] });
  },
};
