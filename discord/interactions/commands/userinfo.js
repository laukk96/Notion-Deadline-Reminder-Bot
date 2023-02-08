const {
    EmbedBuilder
} = require("discord.js");

async function userinfo(interaction, packages) {
    const {
        notionDatabase,
        ClubInfoDatabase,
        UserRegistryDatabase
    } = packages;

    const imageUrl = interaction.user.avatarURL()
    const nameUrl = interaction.user.username

    let user_info = await UserRegistryDatabase.queries.get.user(discord_id);

    const user_name = user_info.payload['name'];
    const notionID = user_info.payload['notion_id'];
    const user_email = user_info.payload['email'];
    const discordID = user_info.payload['discord_id']

    const userinfoEmbed = new EmbedBuilder()
        .setColor("Red")
        .setTitle(`\`Deadlines for:\` **${user_name}**`)
        .setAuthor({
            name: "Get Deadlines",
            iconURL: imageUrl,
        })
        .setThumbnail(imageUrl)
        .addFields(
            { name: 'Info 2', value: user_name },
            { name: 'Info 2', value: notionID},
            { name: 'Info 3', value: user_email},
            { name: 'Info 4', value: discordID},
        )
        .setTimestamp()
        .setFooter({
            text: "Courtesy of the GDSC Development Team",
            iconURL: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.Kg2FF2wpIK_HLyo8Q56ycAHaFj%26pid%3DApi&f=1&ipt=903b969ee37fcf7030b3b98b6b053ba7b2e31ca8f1478f60f135f1c5a5a5796a&ipo=images",
        });

        await interaction.reply({
            embeds: [userinfoEmbed], components: [row]
          });
}
module.exports = userinfo;