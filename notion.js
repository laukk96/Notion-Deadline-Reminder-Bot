require('dotenv').config('/.env');

const { Client } = require("@notionhq/client")

const notion = new Client({
    auth: process.env.NOTION_KEY, 
})
const { Client } = require("@notionhq/client");
const { getDatabase } = require('@notionhq/client/build/src/api-endpoints');

// const databaseId = process.env.NOTION_DATABASE_ID;
// How to share a database with an notion integration/connection? 
const TABLE_DEADLINES_ID = "0f201482f6f1407899e8f7c8ae7dea28";



//console.log(response.results[1]['properties']['Person']);


class NotionDatabase {

    constructor (TABLE_DEADLINES_ID){
        console.log("The NotionClient constructor has been run:");
    }

    getDatabase = async () => {
        const response = await notion.databases.query({
            database_id: TABLE_DEADLINES_ID
        });
        
        // console.log(response)
        console.log("response_results inside getDatabase(): ", response.results)
        return response.results;
    }
    
    getTask = (name) => {
       const thenoob = "hello9";
    }
    

    getStatus = (name) => {
        return {
            filter: {
                property: "Task",
                rich_text: {
                    contains: name
                }
            }
        };

        return response;
    }

    getPerson = async (name) => {
        // const response = await notion.databases.query({
        //     database_id: TABLE_DEADLINES_ID,
        //     filter: {
        //         "properties": "Person",
        //         "rich_text": {
        //             "contains": name
        //         }
        //     }
        // });
        
        const response = await notion.databases.query({
            database_id: TABLE_DEADLINES_ID
        });

        for (let i = 0; i < response.results.length; i++){
            console.log(response.results[i]['properties']['Person']['people'][0]['name']);
        }
        // console.log(response.results[1]['properties']['Person']);
        return response;
    }

}

database1 = new NotionDatabase(TABLE_DEADLINES_ID);
// database1.getDatabase()

database1.getPerson()

// databaseResults = database1.getDatabase();

// console.log("Reached checkpoint 2: ", databaseResults)
// for (let i = 0; i < databaseResults.length; i++){
//     console.log("Properties{}: \n", databaseResults['Properties'])
// }


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