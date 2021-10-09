const { MessageEmbed } = require("discord.js");
const guildConfig = require("../configItems/guild");
const config = require("../../config.json");

module.exports = {
  name: "bot-info",
  description: "Get all information about this bot",
  execute(client, message) {
    const guildConfigs = guildConfig.execute(client, message.guild);
    let color = guildConfigs.color;
    let prefix = guildConfigs.prefix;

    // Get add time for bot (per day)
    let joineUser =
      Date.now() - message.guild.members.cache.get(client.user.id).joinedAt;
    let joineUserAt = Math.floor(joineUser / 86400000);

    const embed = new MessageEmbed()
      .setColor(color)
      .setAuthor(
        `${client.user.username} Information`,
        client.user.displayAvatarURL()
      )
      .setThumbnail(client.user.displayAvatarURL({ size: 1024 }))
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .addField("Bot Name", client.user.username, true)
      .addField("Bot Tag", client.user.discriminator, true)
      .addField("Bot ID", client.user.id, true)
      .addField("Bot Prefix", prefix, true)
      .addField("Bot Owner", `<@${config.developerID}>`, true)
      .addField("Servers", `${client.guilds.cache.size}`, true)
      .addField("Powered By", "**Discord.JS** V13", true)
      .addField("Bot Joined Server at", `**${joineUserAt}** Days Ago`, true)
      .addField("Bot Invite Link", "Bot Private Mibashad.", true)
      .addField("Support Server", "https://discord.gg/5cQ6fZv", true);

    message.channel.send({ embeds: [embed] });
  },
};
