const guildConfig = require("../configItems/guild");
const Discord = require("discord.js");

module.exports = {
  name: "mute",
  description: "Test command",
  execute(client, message) {
    const config = guildConfig.get(client, message.guild);

    // ?ban [usermention] [reason]
    const embed = new Discord.MessageEmbed()
      .setColor(config.color)
      .setDescription(
        `**SYNTAX**: ${config.prefix}${this.name} [usermention] [reason]`
      );
    message.channel.send({ embeds: [embed] });
  },
};
