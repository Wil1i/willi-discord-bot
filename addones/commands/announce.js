const { MessageEmbed } = require("discord.js");
const guildConfig = require("../configItems/guild");

module.exports = {
  name: "announce",
  description: "Send a announcement",
  permission: "administrator",
  execute(client, message) {
    message.delete();

    // Get color for embed (in every commands it's worked)
    const guildConfigs = guildConfig.get(client, message.guild);
    let color = guildConfigs.color;
    let prefix = guildConfigs.prefix;

    const messageArry = message.content.split(" ");
    const embed = new MessageEmbed()
      .setColor(color)
      .setFooter(client.user.username, client.user.displayAvatarURL());
    if (messageArry[1]) {
      // If announce command have text
      embed
        .setAuthor("Announcement", message.guild.iconURL())
        .setDescription(message.content.replace(messageArry[0], ""));
    } else {
      embed.setDescription(
        `**SYNTAX**: ${prefix}${this.name} [Announcement Text]`
      );
    }

    message.channel.send({ embeds: [embed], content: "@everyone" });
  },
};
