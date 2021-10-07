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
    } else if (messageArry[1]) {
      if (messageArry[1].toLowerCase() == "set") {
        if (messageArry[3]) {
          const link = messageArry[messageArry.length - 1];
          if (!link.startsWith("https://") && !link.startsWith("http://")) {
            wishEmbed.setDescription(
              `Please enter a **link** for add a new wish`
            );
            return message.channel.send({ embeds: [wishEmbed] });
          }
          const name = message.content
            .replace(` ${messageArry[messageArry.length - 1]}`, "")
            .replace(`${messageArry[0]} ${messageArry[1]} `, "");

          if (db.has(`wish_${message.author.id}`)) {
            const wishes = db.get(`wish_${message.author.id}`);
            const isWishEditable = wishes.filter((wish) => wish.name == name);
            if (isWishEditable) {
              const newWishes = wishes.filter((wish) => wish.name !== name);
              db.set(`wish_${message.author.id}`, newWishes);
              wishEmbed.setDescription(
                `Item **${name}** successfully edited in your wishlist`
              );
            } else {
              wishEmbed.setDescription(
                `Item **${name}** successfully pushed in your wishlist`
              );
            }
          } else
            wishEmbed.setDescription(
              `Item **${name}** successfully pushed in your wishlist`
            );
          db.push(`wish_${message.author.id}`, {
            name: name,
            link: link,
          });
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

          const itemName = message.content.replace(
            `${messageArry[0]} ${messageArry[1]} `,
            ""
          );

          const newItems = wishes.filter((item) => item.name != itemName);

          if (newItems.length == wishes.length) {
            wishEmbed.setDescription(`Item **${itemName}** is not exist`);
          } else {
            db.set(`wish_${message.author.id}`, newItems);
            wishEmbed.setDescription(
              `Item **${itemName}** successfully deleted`
            );
          }
        } else {
          wishEmbed.setDescription(`You don't have **wishlist**`);
        }
      } else if (messageArry[1].toLowerCase() == "reset") {
        const wishCount = db.get(`wish_${message.author.id}`).size();
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
