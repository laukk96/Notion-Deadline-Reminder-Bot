# Notion-Deadline-Reminder-Bot
The Notion Bot Project for DVC's Google Developer Club.


### Setup:
* Create a Discord Bot in Discord's Developer Portal
* Create a Notion Integration in Notion's Developer Portal
* Turn on Discord Developer mode in Discord settings
* Connect your Notion Integration to your Dashboard (Otherwise you'll find yourself having "database_id not found" errors)
* Create a free MongoDB Atlas database with USER-REGISTRY and DEADLINE-HISTORY collections
* Create a `.env` file with 3 variables: 
1. `DISCORD_CLIENT_ID`
2. `DISCORD_TOKEN`
3. `NOTION_KEY`
4. `MONGODB_PASSWORD`


### [With Node.js] Requires:
```
npm install discord.js
npm install @notionhq/client
npm install mongodb
npm install dotenv
```
