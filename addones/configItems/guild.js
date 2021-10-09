const db = require("quick.db");

module.exports = {
  name: "guild",
  description: "Get all config information about guilds",
  execute(client, guild) {
    const configs = {
      isServerPrime: db.has(`prime_${guild.id}`),
      prefix: db.get(`prefix_${guild.id}`) || db.get(`prefix`),
      color: db.get(`color_${guild.id}`) || db.get(`color`),
    };
    return configs;
  },
};
