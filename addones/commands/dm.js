const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "dm",
  description: "Send message to user dm",
  private: "true",
  execute(client, message) {
    let color = db.get(`color`);
    if (db.has(`color_${message.guild.id}`)) {
      color = db.get(`color_${message.guild.id}`);
    }

    const userMention = message.mentions.users.first();
    const messageArry = message.content.split(" ");

    const embed = new MessageEmbed()
      .setColor(color)
      .setAuthor("DM Sender")
      .setFooter(client.user.username, client.user.displayAvatarURL());

    if (userMention) {
      const embedDM = new MessageEmbed()
        .setColor(color)
        .setAuthor(`DM from ${message.guild.name}`, message.guild.iconURL())
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setDescription(
          message.content.replace(`${messageArry[0]} ${messageArry[1]}`, "")
        );
      userMention
        .send({ embeds: [embedDM] })
        .then(() => {
          embed.setDescription(`Message successfully sent to ${userMention}`);
        })
        .catch(() => {
          embed.setDescription(`Can't send message to user ${userMention}`);
        });
    } else {
      embed.setDescription(
        `**SYNTAX**: ${db.get("prefix")}${this.name} [UserMention] [Text]`
      );
    }
    message.channel.send(embed);
  },
};
