const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const guildConfig = require("../configItems/guild");
const permission = require("../configItems/permission");
const fs = require("fs");

module.exports = {
  name: "help",
  description: "Help all commands",
  help: "false",
  execute(client, message) {
    const config = guildConfig.get(client, message.guild);
    const isUserHavePermission = permission.get(client, message);
    const embed = new MessageEmbed()
      .setColor(config.color)
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .setTitle("Help Commands");

    const commandFiles = fs
      .readdirSync("./commands", "utf-8")
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const grabCommand = require(`./${file}`);
      const commandPermission = grabCommand.permission.toUpperCase() || NaN;
      if (grabCommand.help && grabCommand.help == "false") continue;
      if (
        !grabCommand.description ||
        grabCommand.description == "" ||
        !grabCommand.name
      )
        continue;
      if (grabCommand.permission && !isUserHavePermission[commandPermission])
        continue;

      embed.addField(
        `${config.prefix}${grabCommand.name} ${grabCommand.array || ""}`,
        true
      );
    }

    message.channel.send({ embeds: [embed] });
  },
};
