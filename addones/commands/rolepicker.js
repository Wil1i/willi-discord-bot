const { MessageActionRow, MessageSelectMenu } = require("discord.js");

module.exports = {
  name: "rolepicker",
  description: "Role Picker command",
  private: "true",
  execute(client, message) {
    // with MessageActionRow we can use select menu and... MessageSelectMenu create a select menu for each req
    const jensiat = new MessageActionRow().addComponents(
      new MessageSelectMenu().setCustomId("gamepicker").addOptions(
        {
          label: "👨 Gentleman",
          value: "jensiat-gentleman",
        },
        {
          label: "👩 Lady",
          value: "jensiat-lady",
        }
      )
    );
    message.channel.send({
      content: "Jensiat khod ra entekhab konid.",
      components: [jensiat],
    });

    const platform = new MessageActionRow().addComponents(
      new MessageSelectMenu().setCustomId("gamepicker").addOptions(
        {
          label: "📱 Mobile",
          value: "platform-mobile",
        },
        {
          label: "💻 Camputer",
          value: "platform-pc",
        },
        {
          label: "4️⃣ Playstation",
          value: "platform-playstation",
        },
        {
          label: "❎ X-Box",
          value: "platform-xbox",
        }
      )
    );
    message.channel.send({
      content: "Console khod ra entekhab konid.",
      components: [platform],
    });

    const viewer = new MessageActionRow().addComponents(
      new MessageSelectMenu().setCustomId("gamepicker").addOptions(
        {
          label: "▶ YouTube Viewer",
          value: "viewer-youtube",
        },
        {
          label: "📺 Twitch Viewer",
          value: "viewer-twitch",
        }
      )
    );
    message.channel.send({
      content: "Platform khod ra entekhab konid.",
      components: [viewer],
    });

    const game = new MessageActionRow().addComponents(
      new MessageSelectMenu().setCustomId("gamepicker").addOptions(
        {
          label: "🔫 Rainbow-Six",
          value: "game-rainbow",
        },
        {
          label: "🪂 Pubg",
          value: "game-pubg",
        },
        {
          label: "⛏ Fortnite",
          value: "game-fortnite",
        },
        {
          label: "🎮 Grand Theft Auto",
          value: "game-gta",
        }
      )
    );
    message.channel.send({
      content: "Game khod ra entekhab konid.",
      components: [game],
    });
  },
};
