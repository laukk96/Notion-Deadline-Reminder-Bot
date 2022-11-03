require("dotenv").config();

// Get Collections from MongoDB
// const { UserRegistry, DeadlineHistory } = require("./mongodb/databases");

// // Get Schema Data Objects
// const { UserSchema } = require("./mongodb/schemas/user");
// const { DeadlineSchema } = require("./mongodb/schemas/deadlines");

// const UserRegistryDatabase = new UserRegistry();
// const DeadlineHistoryDatabase = new DeadlineHistory();


// const query = async function () {
//   const payload = await UserRegistryDatabase.connect();
//   if (payload.error) return;
//   UserRegistryDatabase.queries.create.user({
//     name: "Asdawdaw",
//     notion_id: "Awdawdaw",
//   });

//   UserRegistryDatabase.close();
// };

/* Example interface
const UserRegistryDatabase = new UserRegistry();

UserRegistryDatabase.connect();
let payload = UserRegistryDatabase.queries.get.user({name: "John", id: "H1232"});
if (!payload.error) {

}
UserRegistryDatabase.close();
*/

const {
    Events,
    REST,
    Routes,
    DiscordjsError,
    IntegrationApplication,
    Embed,
    EmbedBuilder,
    ActionRowBuilder,
    SlashCommandBuilder,
    ButtonBuilder,
    ButtonStyle,
    ButtonInteraction,
    MessageComponentInteraction,
    CommandInteractionOptionResolver,
    ChatInputCommandInteraction,
    InteractionResponse,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    SelectMenuBuilder,
    SelectMenuOptionBuilder,
} = require("discord.js");

const wait = require("node:timers/promises").setTimeout;

// How to setup .env variables for confidential discord token information
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const TOKEN = process.env.DISCORD_TOKEN;

const commands = [
    new SlashCommandBuilder()
    .setName("update")
    .setDescription("Send a manual notification to officers!"),
    new SlashCommandBuilder()
    .setName("help")
    .setDescription("If you need help to link your notion to discord!"),
    new SlashCommandBuilder()
    .setName("credits")
    .setDescription("The original authors of the bot"),
    new SlashCommandBuilder()
    .setName("adduser")
    .setDescription("Add a User to the Database"),
    new SlashCommandBuilder()
    .setName("getusers")
    .setDescription("Get a list of the users in the database"),

  new SlashCommandBuilder()
    .setName("initiate")
    .setDescription("initiate the server for Notion Deadline Reminders."),

    new SlashCommandBuilder()
    .setName("removeusers")
    .setDescription("Use this to remove users from the database!"),
];

const rest = new REST({
    version: "10"
}).setToken(TOKEN);

(async() => {
    try {
        console.log("Started refreshing application (/) commands.");

        await rest.put(Routes.applicationCommands(CLIENT_ID), {
            body: commands
        });

        console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
        console.error(error);
    }
})();

const {
    Client,
    GatewayIntentBits
} = require("discord.js");
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
    ],
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("Project Notion 2");
});

// Bot joins a server
client.on("guildCreate", (guild) => {
  console.log(`> Joined a guild: ${guild.id}`);
});

// Bot leaves a server
client.on("guildDelete", (guild) => {
  // TODO: Remove from the Database
  console.log(`> Left a guild: ${guild.id}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'update') {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId('primary')
                .setLabel('Notification Update!')
                .setStyle(ButtonStyle.Primary),

            );

        await interaction.reply({
            content: 'Are you sure you want to update all users?',
            components: [row]
        });
 }
     //else if (interaction.commandName == "help") {
    //     const helpEmbed = new EmbedBuilder()
    //         .setColor("White")
    //         .setTitle("Help with Notion")
    //         .setURL("https://www.simple.ink/integrations/discord-in-notion")
    //         .setAuthor({
    //             name: "This is a guide to using Notion with Discord",
    //             iconURL: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
    //             url: "https://discord.js.org",
    //         })
    //         .setThumbnail(
    //             "https://cdn.dribbble.com/users/153131/screenshots/10878981/notion_4x.png"
    //         )
    //         .addFields({
    //             name: "Step 1: Find your Discord UID",
    //             value: "Settings → Advanced → Enable Developer Mode",
    //         })
    //         .addFields({
    //             name: "Step 2: Find your UID",
    //             value: "Right click on your profile and select **Copy ID**",
    //         })
    //         .addFields({
    //             name: "Step 3: Use /adduser",
    //             value: "Input your name, UID, and Notion Email",
    //         })
    //         .addFields({
    //             name: "Step 4: To be set",
    //             value: ":)",
    //         })
    //         .setTimestamp()
    //         .setFooter({
    //             text: "Courtesy of the GDSC Development Team",
    //             iconURL: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.Kg2FF2wpIK_HLyo8Q56ycAHaFj%26pid%3DApi&f=1&ipt=903b969ee37fcf7030b3b98b6b053ba7b2e31ca8f1478f60f135f1c5a5a5796a&ipo=images",
    //         });

    //     await interaction.reply({
    //         embeds: [helpEmbed]
    //     });
     
    else if (interaction.commandName == "credits") {
        const creditsEmbed = new EmbedBuilder()
            .setColor(0x1099ff)
            .setTitle("Credits")
            .setAuthor({
                name: "Google Developer Student Club",
                iconURL: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.g1-tsdPVN-SCgajIwi75MQHaC5%26pid%3DApi&f=1&ipt=8bd00114b7cc9f8ccc54c9b084bb19abf05f20acd2b6f8831f285f3a4c789218&ipo=images",
                url: "https://discord.gg/nxKfjYKFby",
            })
            .setDescription("Credits to the authors!")
            .setThumbnail(
                "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.g1-tsdPVN-SCgajIwi75MQHaC5%26pid%3DApi&f=1&ipt=8bd00114b7cc9f8ccc54c9b084bb19abf05f20acd2b6f8831f285f3a4c789218&ipo=images"
            )
            .addFields({
                name: "Project Leads",
                value: "Kiaran L, Konstantin V"
            }, {
                name: "Discord JS",
                value: "Jay C, Kiaran L"
            }, {
                name: "Notion Api",
                value: "Kiaran L, Richard A "
            }, {
                name: "Security Analysis",
                value: "Jay C, Konstantin V"
            }, {
                name: "Cost Analysis",
                value: "Konstantin V, Richard A"
            })
            .setFooter({
                text: "Courtesy of the GDSC Development Team",
                iconURL: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.Kg2FF2wpIK_HLyo8Q56ycAHaFj%26pid%3DApi&f=1&ipt=903b969ee37fcf7030b3b98b6b053ba7b2e31ca8f1478f60f135f1c5a5a5796a&ipo=images",
            });

        await interaction.reply({
            embeds: [creditsEmbed]
        });
    }
});

// Second 'interactionCreate' function, I guess?
client.on('interactionCreate', async(interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "adduser") {
        // Create the modal
        const modal = new ModalBuilder()
            .setCustomId("addUserModal")
            .setTitle("Add User");

        // Create the text input components
        const nameInput = new TextInputBuilder()
            .setCustomId("nameInput")
            .setLabel("What is the user's Name?")
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const discordInput = new TextInputBuilder()
            .setCustomId("discordInput")
            .setLabel("What is this user's Discord UID?")
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const emailInput = new TextInputBuilder()
            .setCustomId("emailInput")
            .setLabel("What is the user's Email on the Notion page?")
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const firstActionRow = new ActionRowBuilder().addComponents(nameInput);
        const secondActionRow = new ActionRowBuilder().addComponents(discordInput);
        const thirdActionRow = new ActionRowBuilder().addComponents(emailInput)


        modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);

    await interaction.showModal(modal);
    //await interaction.reply({c: 'Your submission was received successfully!'});
  } else if (interaction.commandName == "getusers") {
  } else if (interaction.commandName == "initiate") {
    // TODO: Check if the server has not been initiated already

    const initiateModal = new ModalBuilder()
      .setCustomId("initiateModal")
      .setTitle("Initiate your Server");

    // const agreementInput = new TextInputBuilder()
    //   .setLabel("Do you agree to have your officer information stored on the MongoDB"
    //    + "Cloud managed by our development team?"
    //    + "\nThis includes your officer's:"
    //    + "\n* Name"
    //    + "\n* Email"
    //    + "\n* Discord ID"
    //    + "\n* Notion ID"
    //    + "\n\nType \"Agree\" if you agree to these terms.")
    const clubNameInput = new TextInputBuilder()
      .setCustomId("clubNameInput")
      .setLabel("What is your club name?")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const clubDescriptionInput = new TextInputBuilder()
      .setCustomId("clubDescriptionInput")
      .setLabel("Tell us a brief description about your club!")
      .setStyle(TextInputStyle.Paragraph)
      .setMaxLength(280) // Same as twitter length lol
      .setRequired(false);

    const agreementInput = new TextInputBuilder()
      .setCustomId("agreementInput")
      .setLabel("Do you agree to store information?")
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);

    const firstActionRow = new ActionRowBuilder().addComponents(clubNameInput);
    const secondActionRow = new ActionRowBuilder().addComponents(clubDescriptionInput);
    const thirdActionRow = new ActionRowBuilder().addComponents(agreementInput);

    initiateModal.addComponents([firstActionRow, secondActionRow, thirdActionRow]);
    
    await interaction.showModal(initiateModal);
  }
});

// Third Interaction Create, for Modals / Buttons
client.on("interactionCreate", async (interaction) => {
  // Check if interaction is Modal or Button
  if (!(interaction.isModalSubmit() || interaction.isButton())) return;

  if (interaction.isModalSubmit()) {
    console.log("Received a Modal: ", interaction.customId);
    
    // adduser Modal
    if (interaction.customId == "adduserModal") {
      const name = interaction.fields.getTextInputValue("nameInput");
      const discord_uid = interaction.fields.getTextInputValue("discordInput");
      const email = interaction.fields.getTextInputValue("emailInput");

            console.log("New User Info Received: ", name, " ", discord_uid, " ", email);
            interaction.reply({
                content: "Thank you for submitting your User Info! "
            });
            // const discord_user = client.get(Guilds);
            // interaction.reply({content:`The new user is: ${discord_user}!`});
        }
    }
});

//Removeusers selection menu
client.on('interactionCreate', (interaction) => {
    if (interaction.isChatInputCommand()) {
        if (interaction.commandName == "removeusers") {
            const actionRowComponent = new ActionRowBuilder().setComponents(
                new SelectMenuBuilder().setCustomId('removeme').setOptions([{
                    label: 'removeName',
                    value: 'name'
                }, {
                    label: 'removeEmail',
                    value: 'email'
                }, ])
            );
            interaction.reply({
                components: [actionRowComponent.toJSON()],
            })
        }
    }
})


client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	if (interaction.commandName === 'help') {
        
		const row = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('select')
					.setPlaceholder('Select something for Help!')
					.setMinValues(1)
					.setMaxValues(1)
					.addOptions([
						{
							label: 'Find your UID',
							description: 'This is how to find your UID',
							value: 'first_option',
						},
						{
							label: 'Bot Setup',
							description: 'This is how to setup the bot',
							value: 'second_option',
						},
						{
							label: 'Github Documentation',
							description: 'Technical Documentation of Notion Bot',
							value: 'third_option',
						},
					]),
			);
            
		const embed = new EmbedBuilder()
        .setColor("White")
                .setTitle("This is a guide to for the Notion Deadline Reminder Bot")
                .setURL("https://www.simple.ink/integrations/discord-in-notion")
                .setAuthor({
                    name: "Notion Deadline Reminder Bot",
                    iconURL: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
                    url: "https://discord.js.org",
                })
                .setTimestamp()
                .setFooter({
                  text: "Courtesy of the GDSC Development Team",
                  iconURL: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.Kg2FF2wpIK_HLyo8Q56ycAHaFj%26pid%3DApi&f=1&ipt=903b969ee37fcf7030b3b98b6b053ba7b2e31ca8f1478f60f135f1c5a5a5796a&ipo=images",
                 });
		await interaction.reply({ephemeral: true, embeds: [embed], components: [row] });
	}
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isSelectMenu()) return;

	const selected = interaction.values[0];

	if (selected === 'first_option') {
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
                iconURL: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.Kg2FF2wpIK_HLyo8Q56ycAHaFj%26pid%3DApi&f=1&ipt=903b969ee37fcf7030b3b98b6b053ba7b2e31ca8f1478f60f135f1c5a5a5796a&ipo=images",
            });
            await interaction.reply({
                        embeds: [helpEmbed]
                    });
	} else if (selected === 'second_option') {
		const setupEmbed = new EmbedBuilder()
        await interaction.reply({
            embeds: [setupEmbed]
        });
	} else if (selected === 'third_option') {
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
                value: "DISCORD_TOKEN"
            })
            .setTimestamp()
            .setFooter({
                text: "Courtesy of the GDSC Development Team",
                iconURL: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.Kg2FF2wpIK_HLyo8Q56ycAHaFj%26pid%3DApi&f=1&ipt=903b969ee37fcf7030b3b98b6b053ba7b2e31ca8f1478f60f135f1c5a5a5796a&ipo=images",
            });
            await interaction.reply({
                embeds: [githubEmbed]
            });
    }

});
client.login(TOKEN);