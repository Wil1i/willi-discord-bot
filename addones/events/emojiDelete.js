const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name : "emojiDelete",
    description : "Handle when a emoji/sticker deleted",
    async execute(client, emoji){

        if(!db.has(`emojiDelete_${emoji.guild.id}`)) return;
        
        let Entry = NaN;
        try {
            const AuditLogFetch = await emoji.guild.fetchAuditLogs({limit: 1, type: "EMOJI_DELETE"});
            Entry = AuditLogFetch.entries.first();
        }catch{}

        let color = db.get("color")
        if(db.has(`color_${emoji.guild.id}`)) color = db.get(`color_${emoji.guild.id}`)

        const webhookURL = db.get(`emojiDelete_${emoji.guild.id}`)
        const webhook = new Discord.WebhookClient({url : webhookURL})
        const embed = new Discord.MessageEmbed()
        .setColor(color)
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setAuthor(emoji.guild.name, emoji.guild.iconURL())
        .setDescription("**Emoji `" + emoji.name + "`" + ` Deleted by ${Entry.executor}**`)

        webhook.send({
            username : client.user.username,
            avatarURL : client.user.displayAvatarURL(),
            embeds : [embed]
        })

    }
}