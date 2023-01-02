module.exports = (client) =>
  function guildCreate(guild) {
    console.log(`> Joined a guild: ${guild.id}`);
  };
