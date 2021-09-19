const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name : "emojiCreate",
    description : "Handle emoji when added to server",
    async execute(client, emoji){

        if(!db.has(`emojiCreate_${emoji.guild.id}`)) return;

        let emojiAddress
        if(emoji.animated){
            emojiAddress = `<a:${emoji.name}:${emoji.id}>`
        }else{
            emojiAddress = `<:${emoji.name}:${emoji.id}>`
        }

        let Entry = NaN;
        try {
            const AuditLogFetch = await emoji.guild.fetchAuditLogs({limit: 1, type: "EMOJI_CREATE"});
            Entry = AuditLogFetch.entries.first();
        }catch{}
        
        let color = db.get("color")
        if(db.has(`color_${emoji.guild.id}`)) color = db.get(`color_${emoji.guild.id}`)

        const webhookURL = db.get(`emojiCreate_${emoji.guild.id}`)
        const webhook = new Discord.WebhookClient({url : webhookURL})
        const embed = new Discord.MessageEmbed()
        .setColor(color)
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setDescription(`**User ${Entry.executor} added emoji ${emojiAddress} to server**.`)
        .setAuthor(emoji.guild.name, emoji.guild.iconURL())

        webhook.send({
            username : client.user.username,
            avatarURL : client.user.displayAvatarURL(),
            embeds : [embed]
        })

    }
}