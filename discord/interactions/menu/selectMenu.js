const { ActionRowBuilder, 
        EmbedBuilder,
        ButtonBuilder,
        ButtonStyle } = require("discord.js");

async function selectMenu(interaction) {
  const selected = interaction.values[0];

  if (selected === "first_option") {
    const helpEmbed = new EmbedBuilder()
      .setColor("Yellow")
      .setTitle("Finding your UID")
      .setAuthor({
        name: "This is a guide to finding your UID",
      })
      .addFields({
        name: "Step 1: Find your Discord UID",
        value: "Settings → Advanced → Enable Developer Mode",
      })
      .addFields({
        name: "Step 2: Find your UID",
        value: "Right click on your profile and select **Copy ID**",
      })
      .addFields({
        name: "Step 3: Use /adduser",
        value: "Input your name, UID, and Notion Email",
      })
      .setTimestamp()
      .setFooter({
        text: "Courtesy of the GDSC Development Team",
        iconURL:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.Kg2FF2wpIK_HLyo8Q56ycAHaFj%26pid%3DApi&f=1&ipt=903b969ee37fcf7030b3b98b6b053ba7b2e31ca8f1478f60f135f1c5a5a5796a&ipo=images",
      });
    await interaction.reply({
      embeds: [helpEmbed],
    });
  } else if (selected === "second_option") {
    const setupEmbed = new EmbedBuilder()
    .setColor("Red")
    .setTitle("This is the link to the Notion Guide Page")
    .setTimestamp()
    .setFooter({
      text: "Courtesy of the GDSC Development Team",
      iconURL:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.Kg2FF2wpIK_HLyo8Q56ycAHaFj%26pid%3DApi&f=1&ipt=903b969ee37fcf7030b3b98b6b053ba7b2e31ca8f1478f60f135f1c5a5a5796a&ipo=images",
    }); 
    
    const notionrow = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
      .setLabel('Notion Guide Page')
      .setURL('https://www.notion.so/help/guides')
      .setStyle(ButtonStyle.Link),
    );
    await interaction.reply({
      embeds: [setupEmbed], components: [notionrow]
    });
  } else if (selected === "third_option") {
    const githubEmbed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle("This is the link to the GitHub Repository")
      .setTimestamp()
      .setFooter({
        text: "Courtesy of the GDSC Development Team",
        iconURL:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.Kg2FF2wpIK_HLyo8Q56ycAHaFj%26pid%3DApi&f=1&ipt=903b969ee37fcf7030b3b98b6b053ba7b2e31ca8f1478f60f135f1c5a5a5796a&ipo=images",
      }); 
      
      const helprow = new ActionRowBuilder()
			.addComponents(
        new ButtonBuilder()
        .setLabel('GDSC Notion Page')
        .setURL('https://github.com/pluffpenguin/Notion-Deadline-Reminder-Bot')
        .setStyle(ButtonStyle.Link),
			);
    await interaction.reply({
      embeds: [githubEmbed], components: [helprow]
    });
  }
}

module.exports = selectMenu;
