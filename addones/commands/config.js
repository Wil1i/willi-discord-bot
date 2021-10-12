const db = require("quick.db");
const Discord = require("discord.js");
const guildConfig = require("../configItems/guild");

module.exports = {
  name: "config",
  description: "Config bot",
  private: "true",
  array:
    "[Key (set , delete , reset)] [SubKey (join , left , channel-delete)] [Value (Webhook Link or something)]",
  execute(client, message) {
    const availableSetting = {
      prefix: "prefix",
      color: "color",
      status: "status",
      "status-mode": "status-mode",
    };

    const guildConfigs = guildConfig.get(client, message.guild);
    let color = guildConfigs.color;
    let prefix = guildConfigs.prefix;

    const messageArry = message.content.split(" ");
    const embed = new Discord.MessageEmbed()
      .setColor(color)
      .setFooter(client.user.username, client.user.displayAvatarURL());

    if (!messageArry[2]) return; // Text minimum need to have a Command and Key and SubKey for run this command [!setting delete join]

    const key = messageArry[1].toLowerCase();
    const subKey = messageArry[2].toLowerCase();

    if (key == "set") {
      const value = messageArry[3];
      if (!value) return; // Text in set need to have a Command and Key and SubKey and Value for run [!setting set join WebhookLink]

      // subKey need to be in availableSetting dict
      if (availableSetting.hasOwnProperty(subKey)) {
        let old = "Tarif Nashode.";
        if (db.has(`${subKey}_${message.guild.id}`)) {
          old = db.get(`${subKey}_${message.guild.id}`);
        }
        db.set(`${subKey}_${message.guild.id}`, value);
        embed.setDescription(
          `**${subKey}** successfully set to **${value}**\n\n**Old**: ${old}\n**New**: ${value}`
        );
      } else {
        embed.setDescription(`Setting **${subKey}** is not exist.`);
      }
    } else if (key == "delete") {
      // For delete subkey need to be in availableSetting dict and in database
      if (
        availableSetting.hasOwnProperty(subKey) &&
        db.has(`${subKey}_${message.guild.id}`)
      ) {
        db.delete(`${subKey}_${message.guild.id}`);
        embed.setDescription(`**${subKey}** successfully removed.`);
      } else {
        embed.setDescription(`Can't find this setting.`);
      }
    } else {
      embed.setDescription(`**SYNTAX** : ${prefix}${this.name} ${this.array}`);
    }

    message.channel.send({ embeds: [embed] });
  },
};
