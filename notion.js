require('dotenv').config('/.env');
const { Client } = require("@notionhq/client")

const notion = new Client({
    auth: process.env.NOTION_KEY, 
})

// const databaseId = process.env.NOTION_DATABASE_ID;
// How to share a database with an notion integration/connection? 
const TABLE_DEADLINES_ID = "0f201482f6f1407899e8f7c8ae7dea28";


(async () => {
    // How to retrieve a database? 
    // https://developers.notion.com/reference/retrieve-a-database
    const response = await notion.databases.query({
        database_id: TABLE_DEADLINES_ID
    });

    console.log(response.results[1]['properties']['Person']);
})();
