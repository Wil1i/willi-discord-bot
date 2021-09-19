module.exports = {
    name : "gamepicker",
    description : "A test component",
    async execute(client, interaction){

        const userId = interaction.user.id
        const findUser = interaction.guild.members.cache.get(userId)
        if(!findUser) return;

        if(interaction.values[0] == "jensiat-getleman"){


            if(findUser.roles.cache.has("675750321447764007")) findUser.roles.remove("675750321447764007");
            findUser.roles.add("675750376582152202")

            await interaction.reply({content : "Role Gentleman gived to you", ephemeral : true})
            return;

        }else if(interaction.values[0] == "jensiat-lady"){

            if(findUser.roles.cache.has("675750376582152202")) findUser.roles.remove("675750376582152202");
            findUser.roles.add("675750321447764007s")

            await interaction.reply({content : "Role Lady gived to you", ephemeral : true})
            return;

        }else if(interaction.values[0] == "platform-mobile"){

            findUser.roles.add("675752002923266058")
            await interaction.reply({content : "Role Mobile Player gived to you", ephemeral : true})
            return;

        }else if(interaction.values[0] == "platform-pc"){

            findUser.roles.add("675751962783776779")
            await interaction.reply({content : "Role PC Player gived to you", ephemeral : true})
            return;

        }else if(interaction.values[0] == "platform-playstation"){

            findUser.roles.add("675751846924648448")
            await interaction.reply({content : "Role PlayStation Player gived to you", ephemeral : true})
            return;

        }else if(interaction.values[0] == "platform-xbox"){

            findUser.roles.add("675751923437142052")
            await interaction.reply({content : "Role X-Box Player gived to you", ephemeral : true})
            return;

        }else if(interaction.values[0] == "viewer-youtube"){

            findUser.roles.add("687587391598624778")
            await interaction.reply({content : "Role YouTube Viewer gived to you", ephemeral : true})
            return;

        }else if(interaction.values[0] == "viewer-twitch"){

            findUser.roles.add("687587105630715992")
            await interaction.reply({content : "Role Aparat Viewer gived to you", ephemeral : true})
            return;

        }else if(interaction.values[0] == "game-rainbow"){

            findUser.roles.add("695258188135661589")
            await interaction.reply({content : "Role Rainbow Player gived to you", ephemeral : true})
            return;

        }else if(interaction.values[0] == "game-pubg"){

            findUser.roles.add("698565806094549034")
            await interaction.reply({content : "Role Pubg Player gived to you", ephemeral : true})
            return;

        }else if(interaction.values[0] == "game-fortnite"){

            findUser.roles.add("698565757902258186")
            await interaction.reply({content : "Role Fortnite Player gived to you", ephemeral : true})
            return;

        }else if(interaction.values[0] == "game-gta"){

            findUser.roles.add("671414372655955975")
            await interaction.reply({content : "Role GTA Player gived to you", ephemeral : true})
            return;

        }
 
    }
}