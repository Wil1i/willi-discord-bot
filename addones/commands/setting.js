const Discord = require("discord.js");
const db = require("quick.db");
const config = require("../../config.json");

module.exports = {
  name: "setting",
  description: "All setting about bot",
  execute(client, message) {
    return; // Command is Disable

    let color = db.get("color");
    if (db.has(`color_${message.guild.id}`)) {
      color = db.get(`color_${message.guild.id}`);
    }

    const messageArry = message.content.split(" ");
    const embed = new Discord.MessageEmbed()
      .setColor(color)
      .setFooter(client.user.username, client.user.displayAvatarURL());

    if (!messageArry[3]) return;

    const key = messageArry[1].toLowerCase();
    const subKey = messageArry[2].toLowerCase();
    const value = messageArry[3];

    if (key == "set") {
      if (subKey == "join") {
        db.set(`joinlog_${message.guild.id}`, value);
        embed.setDescription(`**Join Log Successfully Set**.`);
      } else if (subKey == "left") {
        db.set(`leftlog_${message.guild.id}`, value);
        embed.setDescription(`**Left Log Successfully Set**`);
      } else if (subKey == "color" && value.startsWith("#")) {
        if (message.author.id !== config.developerID) return;
        const guildOnly = messageArry[4] == "true";

        let oldColor = NaN;
        if (db.has(`color_${message.guild.id}`)) {
          oldColor = db.get(`color_${message.guild.id}`);
        } else if (db.has("color")) {
          oldColor = db.get("color");
        }

        if (guildOnly) {
          db.set(`color_${message.guild.id}`, value);
        } else {
          db.set(`color`, value);
        }

        if (oldColor) {
          embed.setDescription(
            `**Color Successfully Changed**\n\n**Old Color** : ${oldColor}\n**New Color** : ${value}`
          );
        } else {
          embed.setDescription(
            `**Color Successfully Changed**\n\n**New Color** : ${value}`
          );
        }
      } else if (subKey == "prefix") {
        if (message.author.id !== config.developerID) return;
        const guildOnly = messageArry[4] == "true";

        let oldPrefix = NaN;
        if (db.has(`prefix_${message.guild.id}`)) {
          oldPrefix = db.get(`prefix_${message.guild.id}`);
        } else if (db.has("prefix")) {
          oldPrefix = db.get(`prefix`);
        }

        if (guildOnly) {
          db.set(`prefix_${message.guild.id}`, value);
        } else {
          db.set(`prefix`, value);
        }

        if (oldPrefix) {
          embed.setDescription(
            `**Prefix Successfully Changed**\n\n**Old Prefix** : ${oldPrefix}\n**New Prefix** : ${value}`
          );
        } else {
          embed.setDescription(
            `**Prefix Successfully Changed**\n\n**New Prefix** : ${value}`
          );
        }
      } else if (subKey == "status") {
        if (message.author.id !== config.developerID) return;

        let oldStatus = NaN;
        if (db.has(`status-mode`)) oldStatus = db.get("status-mode");

        db.set(`status`, value);
        client.user.setActivity(value, {
          type: db.get("status-mode"),
        });

        if (oldStatus !== NaN) {
          embed.setDescription(
            `**Status Successfully Changed**\n\n**Old**: ${oldStatus}\n\n**New**: ${value}`
          );
        } else {
          embed.setDescription(
            `**Status Successfully Changed**\n\n**New**: ${value}`
          );
        }
      } else if (subKey == "status-mode") {
        if (message.author.id !== config.developerID) return;

        let oldStatus = NaN;
        if (db.has(`status-mode`)) oldStatus = db.get("status-mode");

        db.set(`status-mode`, value.toUpperCase());
        client.user.setActivity(db.get("status"), {
          type: value.toUpperCase(),
        });

        if (oldStatus !== NaN) {
          embed.setDescription(
            `**Status Mode Successfully Changed**\n\n**Old**: ${oldStatus}\n\n**New**: ${value}`
          );
        } else {
          embed.setDescription(
            `**Status Mode Successfully Changed**\n\n**New**: ${value}`
          );
        }
      } else if (subKey == "channel") {
        db.set(`channel_${message.guild.id}`, value);
        embed.setDescription(`**Channel Create Log Successfully Set**`);
      } else if (subKey == "emoji") {
        db.set(`emoji_${message.guild.id}`, value);
        embed.setDescription(`**Emoji Manage Log Successfully Set**`);
      } else if (subKey == "ban") {
        db.set(`ban_${message.guild.id}`, value);
        embed.setDescription(`**Ban Log Successfully Set**`);
      } else if (subKey == "guildinfo") {
        db.set(`guildInfo`, value);
        embed.setDescription(`**Guildcreate Log Successfully Set**`);
      } else if (subKey == "message-delete") {
        db.set(`messageDelete_${message.guild.id}`, value);
        embed.setDescription(`**Message Delete Log Successfully Set**`);
      } else if (subKey == "pin-update") {
        db.set(`channelPinsUpdate_${message.guild.id}`, value);
        embed.setDescription(`**Channel Pins Update Successfully Set**`);
      }
    }

    message.channel.send({ embeds: [embed] });
  },
};
