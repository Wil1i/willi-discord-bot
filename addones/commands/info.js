const { MessageEmbed } = require("discord.js");
const guildConfig = require("../configItems/guild");

module.exports = {
  name: "info",
  description: "Get user information",
  array: "( [Usermention] )",
  execute(client, message) {
    const config = guildConfig.get(client, message.guild);
    const userMention = message.mentions.users.first();
    const infoEmbed = new MessageEmbed()
      .setColor(config.color)
      .setFooter(client.user.username, client.user.displayAvatarURL());
    if (userMention) {
      const userCreatedAt = Date.now() - userMention.createdAt;
      const userCreatedAtDay = Math.floor(userCreatedAt - 86400000);

      const userJoinedAt =
        Date.now() - message.guild.members.cache.get(userMention.id).joinedAt;
      const userJoinedAtDay = Math.floor(userJoinedAt / 86400000);

      infoEmbed
        .setAuthor(
          `${userMention.username}'s information`,
          userMention.displayAvatarURL({ dynamic: true })
        )
        .addField(`Name`, userMention.username, true)
        .addField(`Discriminator`, userMention.discriminator, true)
        .addField(`ID`, userMention.id, true)
        .setThumbnail(
          userMention.displayAvatarURL({ dynamic: true, size: 1024 })
        );

      if (userCreatedAtDay >= 1 && userCreatedAtDay !== "0") {
        infoEmbed.addField(
          `User Created at`,
          `**${userCreatedAtDay}** Days ago`,
          true
        );
      } else {
        infoEmbed.addField(`User Created at`, `Today`, true);
      }

      if (userJoinedAtDay >= 1 && userJoinedAtDay !== "0") {
        infoEmbed.addField(
          `User Joined at`,
          `**${userJoinedAtDay}** Days ago`,
          true
        );
      } else {
        infoEmbed.addField(`User Joined at`, `Today`, true);
      }
      infoEmbed.addField(
        `Profile URL`,
        userMention.displayAvatarURL({ dynamic: true, size: 1024 })
      );
    } else {
      const userCreatedAt = Date.now() - message.author.createdAt;
      const userCreatedAtDay = Math.floor(userCreatedAt - 86400000);

      const userJoinedAt =
        Date.now() -
        message.guild.members.cache.get(message.author.id).joinedAt;
      const userJoinedAtDay = Math.floor(userJoinedAt / 86400000);

      infoEmbed
        .setAuthor(
          `Your Information`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .addField(`Name`, message.author.username, true)
        .addField(`Discriminator`, message.author.discriminator, true)
        .addField(`ID`, message.author.id, true)
        .setThumbnail(
          message.author.displayAvatarURL({ dynamic: true, size: 1024 })
        );

      if (userCreatedAtDay >= 1 && userCreatedAtDay !== "0") {
        infoEmbed.addField(
          `User Created at`,
          `**${userCreatedAtDay}** Days ago`,
          true
        );
      } else {
        infoEmbed.addField(`User Created at`, `Today`, true);
      }

      if (userJoinedAtDay >= 1 && userJoinedAtDay !== "0") {
        infoEmbed.addField(
          `User Joined at`,
          `**${userJoinedAtDay}** Days ago`,
          true
        );
      } else {
        infoEmbed.addField(`User Joined at`, `Today`, true);
      }
      infoEmbed.addField(
        `Profile URL`,
        message.author.displayAvatarURL({ dynamic: true, size: 1024 })
      );
    }
    message.channel.send({ embeds: [infoEmbed] });
  },
};
