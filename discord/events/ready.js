module.exports = (client) =>
  function ready() {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("Project Notion 2");
  };
