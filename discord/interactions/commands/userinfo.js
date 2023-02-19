const { EmbedBuilder } = require("discord.js");

async function userinfo(interaction, packages) {
  const { notionDatabase, ClubInfoDatabase, UserRegistryDatabase } = packages;

  const imageUrl = interaction.user.avatarURL();
  const nameUrl = interaction.user.username;
  const interactionUser = await interaction.guild.members.fetch(
    interaction.user.id
  );
  let user_info = await UserRegistryDatabase.queries.get.user({
    server_id: interaction.guild.id,
    user: interactionUser.id,
  });

  const user_name = user_info["name"];
  const notionID = user_info["notion_id"];
  const user_email = user_info["email"];
  const discordID = user_info["discord_id"];

  const userinfoEmbed = new EmbedBuilder()
    .setColor("Red")
    .setTitle(`**${user_name}**`)
    .setAuthor({
      name: "User Info",
      iconURL: imageUrl,
      url: "https://www.notion.so/Overall-Task-List-beb4f1b15ec1443c87e16bd138832d06",
    })
    .setThumbnail(imageUrl)
    .addFields(
      { name: "Name", value: user_name },
      { name: "Email", value: user_email },
      { name: "Discord Id", value: discordID }
    )
    .setTimestamp()
    .setFooter({
      text: "Courtesy of the GDSC Development Team",
      iconURL:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.Kg2FF2wpIK_HLyo8Q56ycAHaFj%26pid%3DApi&f=1&ipt=903b969ee37fcf7030b3b98b6b053ba7b2e31ca8f1478f60f135f1c5a5a5796a&ipo=images",
    });

  await interaction.reply({
    embeds: [userinfoEmbed],
  });
}
module.exports = userinfo;
