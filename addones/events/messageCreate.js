const db = require("quick.db");

module.exports = {
  name: "messageCreate",
  description: "Handle messages",
  execute(client, message) {
    if (db.has(`mute.${message.author.id}`)) message.delete();
  },
};
