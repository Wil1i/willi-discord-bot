const { MessageEmbed, WebhookClient } = require("discord.js")
const db = require("quick.db")

module.exports = {
    name : "channelPinsUpdate",
    description  : "When a message pinned or unpinned",
    execute(client, channel, time){

        // Check if guild have pins update log
        if(!db.has(`channelPinsUpdate_${channel.guild.id}`)) return;
        const channelPinsUpdate = db.get(`channelPinsUpdate_${channel.guild.id}`)

        // color setting
        let color = db.get('color')
        if(db.has(`color_${channel.guild.id}`)){
            color = db.get(`color_${channel.guild.id}`)
        }

        const webhook = new WebhookClient({url : channelPinsUpdate})
        const embed = new MessageEmbed()
        .setColor(color)
        .setAuthor(`${channel.guild.name}`, channel.guild.iconURL({dynamic : true}))
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()
        .setDescription(`**:pushpin: Channel Pin Updated**.\n\n**Channel** : ${channel}\n**Time** : ${time}`)

        webhook.send({
            username : client.user.username,
            avatarURL : client.user.displayAvatarURL(),
            embeds : [embed]
        })

    }
}