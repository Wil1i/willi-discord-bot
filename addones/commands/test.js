const guildInformation = require("../configItems/guild");

module.exports = {
  name: "test",
  execute(client, message) {
    const guildConfig = guildInformation.execute(client, message.guild);
    console.log(guildConfig);
  },
};
