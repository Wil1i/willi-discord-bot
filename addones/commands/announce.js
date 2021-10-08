const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "announce",
  description: "Send a announcement",
  permission: "administrator",
  execute(client, message) {
    message.delete();

    // Get color for embed (in every commands it's worked)
    let color = db.get(`color`);
    if (db.has(`color_${message.guild.id}`)) {
      color = db.get(`color_${message.guild.id}`);
    }

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
        `**SYNTAX**: ${db.get("prefix")}${this.name} [Announcement Text]`
      );
    }

    message.channel.send({ embeds: [embed], content: "@everyone" });
  },
};
