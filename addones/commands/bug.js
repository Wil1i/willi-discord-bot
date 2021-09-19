const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const config = require("../../config.json");

module.exports = {
  name: "bug",
  description: "Report a bug from bot",
  execute(client, message) {
    let color = db.get(`color`);
    if (db.has(`color_${message.guild.id}`)) {
      color = db.get(`color_${message.guild.id}`);
    }

    const developer = client.users.cache.get(config.developerID);
    const messageArry = message.content.split(" ");

    const reportEmbed = new MessageEmbed().setColor(color);
    const embed = new MessageEmbed()
      .setColor(color)
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .setAuthor("NEW Bug", client.user.displayAvatarURL());

    if (messageArry[1]) {
      embed.setDescription(message.content.replace(messageArry[0], ""));

      developer
        .send({ embeds: [embed] })
        .then(() => {
          reportEmbed.setDescription(
            "Report Shoma Ba Movafaghiat Sabt Shod. Mamnoon Az Report Shoma."
          );
        })
        .catch(() => {
          reportEmbed.setDescription(
            "Dar Ersale Report Moshkeli Be Vojood Amade. Lotfan Badan Talash Konid."
          );
        });
    } else {
      reportEmbed.setDescription(
        `**SYNTAX**: ${db.get("prefix")}${this.name} [About Bug]`
      );
    }
    message.channel.send(reportEmbed);
  },
};
