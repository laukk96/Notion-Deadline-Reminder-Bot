//require Discord.js API library
const { EmbedBuilder } = require("discord.js");

//asynchronous function to generate a credits embed
async function credits(interaction) {
  //create a new embed builder
  const creditsEmbed = new EmbedBuilder()
    //set the color of the embed to light blue
    .setColor(0x1099ff)
    //set the title of the embed
    .setTitle("Credits")
    //set the author of the embed with name, an image, and a url
    .setAuthor({
      name: "Google Developer Student Club",
      iconURL:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.g1-tsdPVN-SCgajIwi75MQHaC5%26pid%3DApi&f=1&ipt=8bd00114b7cc9f8ccc54c9b084bb19abf05f20acd2b6f8831f285f3a4c789218&ipo=images",
      url: "https://discord.gg/nxKfjYKFby",
    })
    //set the description of the embed
    .setDescription("Credits to the authors!")
    //set the thumbnail of the embed
    .setThumbnail(
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.g1-tsdPVN-SCgajIwi75MQHaC5%26pid%3DApi&f=1&ipt=8bd00114b7cc9f8ccc54c9b084bb19abf05f20acd2b6f8831f285f3a4c789218&ipo=images"
    )
    //add fields with the project leads and other contributors
    .addFields(
      {
        name: "Project Leads",
        value: "Kiaran L, Konstantin V",
      },
      {
        name: "Discord JS",
        value: "Jay C, Kiaran L",
      },
      {
        name: "Notion Api",
        value: "Kiaran L, Richard A ",
      },
      {
        name: "Mongo Wrapper",
        value: "Konstantin V",
      }
    )
    //set the footer of the embed
    .setFooter({
      text: "Courtesy of the GDSC Development Team",
      iconURL:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.Kg2FF2wpIK_HLyo8Q56ycAHaFj%26pid%3DApi&f=1&ipt=903b969ee37fcf7030b3b98b6b053ba7b2e31ca8f1478f60f135f1c5a5a5796a&ipo=images",
    });

  //send the embed
  await interaction.reply({
    embeds: [creditsEmbed],
  });
}

//export the credits function
module.exports = credits;
