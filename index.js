

const { REST, Routes, 
  DiscordjsError, IntegrationApplication, 
  Embed, EmbedBuilder,
  ActionRowBuilder, ButtonBuilder, ButtonStyle, ButtonInteraction,
  MessageComponentInteraction, ChatInputCommandInteraction } = require('discord.js');


const wait = require('node:timers/promises').setTimeout;

// const CLIENT_ID = "731644582164430870"
// const TOKEN = "NzMxNjQ0NTgyMTY0NDMwODcw.GnN_KO.4Qa3Fa6KQn-p5yLsLZ8Rnvg0EgSa1g7YSHqsCo"

const { CLIENT_ID, TOKEN } = require('./config.json')

const commands = [  
    {
      name: 'ping',
      description: 'Replies with Pong!',
    },
    {
      name: 'doc',
      description: 'Sends a link to the Notion Documentation.'
    },
    {
      name: 'button',
      description: 'Test with Button Interactions.'
    }
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
    try {
      console.log('Started refreshing application (/) commands.');
  
      await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
      
      console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
      console.error(error);
    }
})();


const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent
  ]
});


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('Project Notion 2');
});


client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;  

  if (interaction.commandName == 'ping') {
    await interaction.reply('Pong!');
    await client.channels.cache.get(interaction.channelId).send("The pong has been sent!");
  }
  else if(interaction.commandName == 'doc'){
    await interaction.reply('https://www.notion.so/help/guides/category/documentation');
  }
  else if (interaction.commandName == 'button'){
    // [ Embed Message ]
    const button_embed = new EmbedBuilder()
      .setColor('Grey')
      .setTitle('Button Interaction Test')
      .setDescription('Test this message by clicking one of the buttons!')
      .setImage('https://cdn.dribbble.com/users/153131/screenshots/10878981/notion_4x.png')
      .setTimestamp()
      // .setURL()
      // .setAuthor({
      //   name: 'Notion Bot',
      //   iconURL: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png',
      //   url: 'https://developers.notion.com/reference/intro',
      //   description: 'Test this message by clicking one of the buttons!'
      // })
    
    // [ Row of Buttons ]
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('Primary')
          .setLabel('Blue')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId('Secondary')
          .setLabel('Red')
          .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
          .setCustomId('Green')
          .setLabel('Green')
          .setStyle(ButtonStyle.Success),
      );
    
    

    await interaction.reply({embeds: [button_embed], components: [row]});
  }
});

client.on('messageCreate', (message) => {
  // Check to see if the message created is it's own message
  if (message.author.id == '1018596435320639539'){ return; }
  // message.channel.send(message.content);
});


console.log('Hello World.');


client.login(TOKEN);