const { EmbedBuilder } = require("discord.js");

async function selectMenu(interaction, packages) {
  const selected = interaction.values[0];

  if (selected === "first_option") {
    const helpEmbed = new EmbedBuilder()
      .setColor("White")
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
    const setupEmbed = new EmbedBuilder();
    await interaction.reply({
      embeds: [setupEmbed],
    });
  } else if (selected === "third_option") {
    const githubEmbed = new EmbedBuilder()
      .setColor("White")
      .setTitle("The Notion Bot Project from the DVC's Google Developer Club.")
      .setAuthor({
        name: "This it the GitHub documentation",
      })
      .addFields({
        name: "Create a Discord Bot in Discord's Developer Portal",
        value: "N/A",
      })
      .addFields({
        name: "Create a Notion Integration in Notion's Developer Portal",
        value: "N/A",
      })
      .addFields({
        name: "Turn on Discord Developer mode in Discord settings",
        value: "?",
      })
      .addFields({
        name: "Connect your Notion Integration to your Dashboard (Otherwise you'll find yourself having **database_id not found** errors)",
        value: "?",
      })
      .addFields({
        name: "Create a free MongoDB Atlas database with USER-REGISTRY and DEADLINE-HISTORY collections",
        value: "?",
      })
      .addFields({
        name: "Create a .env file with 3 variables:",
        value: "DISCORD_CLIENT_ID",
        value: "DISCORD_TOKEN",
      })
      .setTimestamp()
      .setFooter({
        text: "Courtesy of the GDSC Development Team",
        iconURL:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.Kg2FF2wpIK_HLyo8Q56ycAHaFj%26pid%3DApi&f=1&ipt=903b969ee37fcf7030b3b98b6b053ba7b2e31ca8f1478f60f135f1c5a5a5796a&ipo=images",
      });
    await interaction.reply({
      embeds: [githubEmbed],
    });
  }
}

module.exports = selectMenu;
