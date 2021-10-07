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
    let wishEmbed = new MessageEmbed().setColor(color);

    if (userMention) {
      wishEmbed.setAuthor(`Wish List for ${userMention.username}`);
      if (!db.has(`wish_${userMention.id}`)) {
        wishEmbed.setDescription("There is not any items");
        return message.channel.send({ embeds: [wishEmbed] });
      }
      const wishList = db.get(`wish_${userMention.id}`);
      let counter = 0;
      let allCounts = 0;

      for (const item of wishList) {
        const { name, link } = item;

        if (counter == 24) {
          message.channel.send({ embeds: [wishEmbed] });
          wishEmbed = new MessageEmbed().setColor(color);
          counter = 0;
        }
        wishEmbed.addField(name, link);
        counter++;
        allCounts++;
      }
      if (wishList.length == 0)
        wishEmbed.setDescription("There is not any items");
      wishEmbed.setFooter(`${allCounts} Items found`);
      return message.channel.send({ embeds: [wishEmbed] });
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
      } else if (messageArry[1].toLowerCase() == "reset") {
        const wishCount = db.get(`wish_${message.author.id}`).size;
        db.delete(`wish_${message.author.id}`);
        wishEmbed.setDescription(
          `Your wish list with **${wishCount}** wishes successfully deleted.`
        );
      } else {
        wishEmbed.setDescription(
          `**SYNTAX**: ${db.get("prefix")}${
            this.name
          } [SET/DEL/Mention] {[Item Name] [Link]}`
        );
      }
    } else {
      wishEmbed.setDescription(
        `Your Wish List`,
        message.author.displayAvatarURL({ dynamic: true })
      );
      if (!db.has(`wish_${message.author.id}`)) {
        wishEmbed.setDescription("There is not any items");
        return message.channel.send({ embeds: [wishEmbed] });
      }
      // Return wish list for user
      const wishList = db.get(`wish_${message.author.id}`);
      let counter = 0;
      let allCounts = 0;

      for (const item of wishList) {
        const { name, link } = item;

        if (counter == 24) {
          message.channel.send({ embeds: [wishEmbed] });
          wishEmbed = new MessageEmbed().setColor(color);
          counter = 0;
        }
        wishEmbed.addField(name, link);
        counter++;
        allCounts++;
      }
      if (wishList.length == 0)
        wishEmbed.setDescription("There is not any items");
      wishEmbed.setFooter(`${allCounts} Items found`);
      return message.channel.send({ embeds: [wishEmbed] });
    }
    message.channel.send({ embeds: [wishEmbed] });
  },
};
