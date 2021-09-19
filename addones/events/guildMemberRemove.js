const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name : "guildMemberRemove",
    description : "Handle event when a user kicked/banned/leaved from a server",
    execute(client, member){

        if(!db.has(`leftlog_${member.guild.id}`)) return;
        const leftLog = db.get(`leftlog_${member.guild.id}`)

        let color = db.get('color')
        if(db.has(`color_${member.guild.id}`)){
            color = db.get(`color_${member.guild.id}`)
        }

        const webhook = new Discord.WebhookClient({url : leftLog})
        const embed = new Discord.MessageEmbed()
        .setColor(color)
        .setAuthor(`${member.user.tag} Leaved`, member.user.displayAvatarURL())
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setThumbnail(member.user.displayAvatarURL({dynamic : true, size : 1024}))
        .setDescription(`User <@${member.user.id}> left.\n\n`)

        webhook.send({
            username : `${client.user.username} | Left Log`,
            avatarURL : client.user.displayAvatarURL(),
            embeds : [embed]
        })

    }
}