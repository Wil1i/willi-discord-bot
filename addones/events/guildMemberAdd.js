const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name : "guildMemberAdd",
    description : "Handle event when a member joined to server",
    execute(client, member){

        if(!db.has(`joinlog_${member.guild.id}`)) return;

        let color = db.get('color')
        if(db.has(`color_${member.guild.id}`)){
            color = db.get(`color_${member.guild.id}`)
        }

        const joinLog = db.get(`joinlog_${member.guild.id}`)

        let createUser = Date.now() - member.user.createdAt;
        let createUserAt = Math.floor(createUser / 86400000);

        const webhook = new Discord.WebhookClient({url : joinLog})
        const embed = new Discord.MessageEmbed()
        .setColor(color)
        .setAuthor(`${member.user.tag} Joined`, member.user.displayAvatarURL())
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setThumbnail(member.user.displayAvatarURL({dynamic : true, size : 1024}))
        .setDescription(`**<@${member.user.id}> join to the server.**\n\n:timer:**Age of account:**\n` + "`" + createUserAt + " Days ago" + "`")

        webhook.send({
            username : `${client.user.username} | Join Log`,
            avatarURL : client.user.displayAvatarURL(),
            embeds : [embed]
        })

    }
}