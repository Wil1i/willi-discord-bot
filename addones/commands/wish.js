const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "wish",
  execute(client, message) {
    let color = db.get("color");
    if (db.has(`color_${message.guild.id}`)) {
      color = db.get(`color_${message.guild.id}`);
    }

    const userMention = message.mentions.users.first();
    const messageArry = message.content.split(" ");
    const wishEmbed = new MessageEmbed().setColor(color);

    if (userMention) {
      if (!db.has(`wish_${userMention.id}`))
        return message.channel.send(">>> There is not any items");
      const wishList = db.get(`wish_${userMention.id}`);
      let text = ">>> ";

      for (const item of wishList) {
        // Create an embed and send wish lists
        text += `**${item.name}** => ${item.link}\n\n`;
      }
      if (text == ">>> ")
        return message.channel.send(">>> There is not any items");
      return message.channel.send(text);
    } else if (messageArry[2]) {
      if (messageArry[1].toLowerCase() == "set") {
        if (messageArry[3]) {
          db.push(`wish_${message.author.id}`, {
            name: messageArry[2],
            link: messageArry[3],
          });
          wishEmbed.setDescription(
            `Item **${messageArry[2]}** successfully pushed in your wishlist`
          );
        } else {
          wishEmbed.setDescription(
            `**SYNTAX**: ${db.get("prefix")}${
              this.name
            } [SET] [Item Name] [Item Link]`
          );
        }
      } else if (messageArry[1].toLowerCase() == "del") {
        if (db.has(`wish_${message.author.id}`)) {
          const wishes = db.get(`wish_${message.author.id}`);
          const newItems = wishes.filter((item) => item.name != messageArry[2]);

          if (newItems.length == wishes.length) {
            wishEmbed.setDescription(`Item **${messageArry[2]}** is not exist`);
          } else {
            db.set(`wish_${message.author.id}`, newItems);
            wishEmbed.setDescription(
              `Item **${messageArry[2]}** successfully deleted`
            );
          }
        } else {
          wishEmbed.setDescription(`You don't have **wishlist**`);
        }
      }
    } else {
      if (!db.has(`wish_${message.author.id}`))
        return message.channel.send(">>> There is not any items");
      // Return wish list for user
      const wishList = db.get(`wish_${message.author.id}`);
      let text = ">>> ";

      for (const item of wishList) {
        // Create an embed and send wish lists
        text += `**${item.name}** => ${item.link}\n\n`;
      }
      if (text == ">>> ")
        return message.channel.send(">>> There is not any items");
      return message.channel.send(text);
    }
    message.channel.send({ embeds: [wishEmbed] });
  },
};
