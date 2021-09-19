const { MessageEmbed, WebhookClient } = require("discord.js")
const db = require("quick.db")

module.exports = {
    name : "messageDelete",
    description : "When a message deleted",
    execute(client, message){

        // Check if guild have message delete log
        if(!db.has(`messageDelete_${message.guild.id}`) || message.author.bot) return;
        const messageDelete = db.get(`messageDelete_${message.guild.id}`)

        // Color setting
        let color = db.get('color')
        if(db.has(`color_${message.guild.id}`)){
            color = db.get(`color_${message.guild.id}`)
        }

        let text = ""

        // Check message status
        if(message.content && message.content !== "") text = `:wastebasket: Message sent by <@${message.author.id}> deleted in <#${message.channel.id}>.\n${message.content}`
        if(message.pinned) text += `\n**Pinned**: True`
        if(message.tts) text += `\n**TTS**: True`
        if(message.embeds[0]) text += `\n**Embed**: True`

        const webhook = new WebhookClient({url : messageDelete})
        const embed = new MessageEmbed()
        .setColor(color)
        .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.guild.iconURL({dynamic : true}))
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()
        .setDescription(text)
    
        webhook.send({
            username : client.user.username,
            avatarURL : client.user.displayAvatarURL(),
            embeds : [embed]
        })

    }
}