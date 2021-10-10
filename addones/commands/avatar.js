const Discord = require("discord.js");
const guildConfig = require("../configItems/guild");

module.exports = {
  name: "avatar",
  description: "Get user profile",
  execute(client, message) {
    // get color (if guild have spacial color it's changed to guild color)
    const guildConfigs = guildConfig.get(client, message.guild);
    let color = guildConfigs.color;

    const userMention = message.mentions.users.first();
    const embed = new Discord.MessageEmbed()
      .setColor(color)
      .setTitle("Avatar URL")
      .setFooter(
        `Requested by ${message.author.tag}`,
        message.author.displayAvatarURL()
      );

    // If user mention/reply a user in message
    if (userMention) {
      embed
        .setImage(userMention.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setURL(userMention.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setAuthor(
          `${userMention.username}'s Avatar`,
          userMention.displayAvatarURL()
        );
    } else {
      embed
        .setImage(
          message.author.displayAvatarURL({ dynamic: true, size: 1024 })
        )
        .setURL(message.author.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setAuthor(
          `${message.author.username}'s Avatar`,
          message.author.displayAvatarURL()
        );
    }

    message.channel.send({ embeds: [embed] });
  },
};
