require('dotenv').config('/.env');
const { Client } = require("@notionhq/client");
const { getDatabase } = require('@notionhq/client/build/src/api-endpoints');

// const databaseId = process.env.NOTION_DATABASE_ID;
// How to share a database with an notion integration/connection? 
const TABLE_DEADLINES_ID = "0f201482f6f1407899e8f7c8ae7dea28";

const notion = new Client({
    auth: process.env.NOTION_KEY,
})

class NotionDatabase {
    
    constructor (TABLE_DEADLINES_ID){
        console.log("The NotionDatabase is being created!");
        (async () => {
            const response = await notion.databases.query({
                database_id: TABLE_DEADLINES_ID
            });
        
            //console.log(response.results[1]['properties']['Person']);
        })();
    }
    
    getTask = (name) => {
       return {
        filter: {
            property: "Person",
            rich_text: {
                contains: name
            }
        }
    }
    

    getStatus = (name) => {
        return {
            filter: {
                property: "Status",
                rich_text: {
                    contains: name
                }
            }
        }
    }

}

database1 = new NotionDatabase(TABLE_DEADLINES_ID);
console.log(database1.getTask("Jay"));
/*
(async () => {
    // How to retrieve a database? 
    // https://developers.notion.com/reference/retrieve-a-database
    const response = await notion.databases.query({
        database_id: TABLE_DEADLINES_ID
    });

    console.log(response.results[1]['properties']['Person']);
})();
*/