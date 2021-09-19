const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name : "guildDelete",
    description : "Handle when bot removed from a server",
    execute(client, guild){
        
        if(!db.has(`guildInfo`)) return;

        const color = db.get("color")
        const webhookURL = db.get(`guildInfo`)
        const webhook = new Discord.WebhookClient({url : webhookURL})
        const embed = new Discord.MessageEmbed()
        
        .setColor(color)
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setAuthor(guild.name, guild.iconURL())
        .setDescription(`Bot ${client.user.username} removed from server **${guild.name}**.`)
        .setThumbnail(guild.iconURL({dynamic : true, size : 1024}))

        webhook.send({
            username : client.user.username,
            avatarURL : client.user.displayAvatarURL(),
            embeds : [embed]
        })

    }
}