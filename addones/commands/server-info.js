const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "server-info",
  description: "Get Server Information",
  execute(client, message) {
    let color = db.get(`color`);
    if (db.has(`color_${message.guild.id}`)) {
      color = db.get(`color_${message.guild.id}`);
    }

    // Get time for server born (per day)
    let serverCreated = Date.now() - message.guild.createdAt;
    let serverCreatedAt = Math.floor(serverCreated / 86400000);

    const embed = new MessageEmbed()
      .setColor(color)
      .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .addField("Server Name", message.guild.name, true)
      .addField("Server Owner", `<@${message.guild.ownerId}>`, true)
      .addField("Server ID", message.guild.id, true)
      .addField("Server Members", `${message.guild.memberCount}`, true)
      .addField(
        "Text Channels",
        `${
          message.guild.channels.cache.filter(
            (channel) => channel.type == "GUILD_TEXT"
          ).size
        }`,
        true
      )
      .addField(
        "Voice Channels",
        `${
          message.guild.channels.cache.filter(
            (channel) => channel.type == "GUILD_VOICE"
          ).size
        }`,
        true
      )
      .addField(
        "Categorys",
        `${
          message.guild.channels.cache.filter(
            (channel) => channel.type == "GUILD_CATEGORY"
          ).size
        }`,
        true
      )
      .addField("Roles", `${message.guild.roles.cache.size}`, true)
      .addField("Server Created at", `**${serverCreatedAt}** Days ago`, true)
      .addField(
        "Server Icon URL",
        message.guild.iconURL({ size: 1024, dynamic: true })
      );

    message.channel.send({ embeds: [embed] });
  },
};
