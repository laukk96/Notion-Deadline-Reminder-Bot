# Notion-Deadline-Reminder-Bot
The Notion Bot Project for DVC's Google Developer Club.


### Setup:
* Create a Discord Bot in Discord's Developer Portal
* Create a Notion Integration in Notion's Developer Portal
* Connect your Notion Integration to your Dashboard (Otherwise you'll find yourself having "database_id not found" errors)
* Create a `.env` file with 3 variables: 
1. `DISCORD_CLIENT_ID`
2. `DISCORD_TOKEN`
3. `NOTION_KEY`


### Requires:
```
npm install discord.js
npm install @notionhq/client
npm install dotenv
```
