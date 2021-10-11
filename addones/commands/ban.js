const { MessageEmbed } = require("discord.js");
const guildConfig = require("../configItems/guild");

module.exports = {
  name: "ban",
  description: "Ban a user",
  permission: "ban_members",
  array: "[Mention] [Reason]",
  execute(client, message) {
    message.delete();

    const config = guildConfig.get(client, message.guild);
    const messageArry = message.content.split(" ");
    const userMention = message.mentions.users.first();
    const banEmbed = new MessageEmbed()
      .setColor(config.color)
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .setAuthor("Ban User");

    // If command have reason and user mentioned another user
    if (messageArry[2] && userMention) {
      const banReason = message.content.replace(
        `${messageArry[0]} ${messageArry[1]}`,
        ""
      );

      // If user is in server
      const findUser = message.guild.members.cache.get(userMention.id);
      if (findUser) {
        findUser
          .ban({ reason: banReason })
          .then(() => {
            // User successfully banned
            banEmbed.setDescription(
              `User **${userMention.username}** successfully banned from server.\n\n**Banned by**: <@${message.author.id}>\n**Reason**: ${banReason}`
            );
          })
          .catch(() => {
            // User not ban (for permission reason)
            banEmbed.setDescription(`I can't ban ${userMention} user.`);
          });
      } else {
        // Can't find user
        banEmbed.setDescription(`I can't find user.`);
      }
    } else {
      // Show syntax
      banEmbed.setDescription(
        `**SYNTAX**: ${config.prefix}${this.name} ${this.array}`
      );
    }
    message.channel.send({ embeds: [banEmbed] });
  },
};
