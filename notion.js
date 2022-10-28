require('dotenv').config('/.env');

const { Client } = require("@notionhq/client")

const notion = new Client({
    auth: process.env.NOTION_KEY, 
})

const { getDatabase } = require('@notionhq/client/build/src/api-endpoints');

// const databaseId = process.env.NOTION_DATABASE_ID;
// How to share a database with an notion integration/connection? 
<<<<<<< HEAD
// const TABLE_DEADLINES_ID = "0f201482f6f1407899e8f7c8ae7dea28";
=======
const TABLE_DEADLINES_ID = "f944e134b0584cc289d0a97775384d76";
//GDSC f944e134b0584cc289d0a97775384d76
//NOTION DEV TEAM 0f201482f6f1407899e8f7c8ae7dea28
>>>>>>> 3aae6120aa8cb11e3bad2aa0610c799eb3799ba0

const TABLE_DEADLINES_ID = "f944e134b0584cc289d0a97775384d76";


//console.log(response.results[1]['properties']['Person']);


<<<<<<< HEAD
class NotionDatabase {
    constructor (TABLE_DEADLINES_ID){
        console.log("The NotionClient constructor has been run:", TABLE_DEADLINES_ID);
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
=======
//just to check the objects in the properties
const checkDataBase = async () => {
    const response = await notion.databases.query({
        database_id: TABLE_DEADLINES_ID
    });

    for (let i = 0; i < response.results.length; i++){
        // console.log(response.results[i]['properties']['Person']['people'][0]['name']);
        if (response.results[i]['properties']['Deadline']['date'] != null){
            console.log("> Deadline Title: ", response.results[i]['properties']['Task']['title'][0]['plain_text']);
            // console.log(response.results[i]['properties']['Taskee']['people']);
            
            // Print all the names of the people in a deadline
            const peopleArray = response.results[i]['properties']['Taskee']['people'];
            for (let j = 0; j < peopleArray.length; j++){
                console.log('Officer Name: ', peopleArray[j]['name']);
                //console.log('Email: ', peopleArray[j]['person']['email']);
                console.log();
            }

            console.log('Finish Date: ', response.results[i]['properties']['Deadline']['date']['start']);    
            console.log('\n======================================================');
        }
>>>>>>> 3aae6120aa8cb11e3bad2aa0610c799eb3799ba0
    }
}

class NotionDatabase 
{

    constructor (connectDatabase)
    {
        this.connectDatabase = connectDatabase;
        console.log("The NotionDatabase is being created!");
        (async () => {
            const response = await notion.databases.query({
                database_id: connectDatabase
            });
        })();
    }
    
    parseNotionId = async (email) =>
    {
        const response = await notion.databases.query({
            database_id: TABLE_DEADLINES_ID
        });
        console.log("Getting " + email + "'s Notion ID...");
        outerloop: for (let i = 0; i < response.results.length; i++){
            if (response.results[i]['properties']['Deadline']['date'] != null){
                
                const peopleArray = response.results[i]['properties']['Taskee']['people'];
                let j = 0;
                while (j < peopleArray.length)
                {
                    if (peopleArray[j]['person']['email'] != null)
                    {
                        if (peopleArray[j]['person']['email'].includes(email))
                        {
                            console.log(peopleArray[j]['id']);
                            break outerloop;
                        }
                    }
                    j++;
                }
            }
        }
        //console.log(response.results[deadLineIndex]['properties']['Taskee'][personIndex]['people']['id']);
    }

    AddUser = async (server_id, info) =>
    {
        
    }


    getPerson = async (deadline) => {
        const response = await notion.databases.query({
            database_id: TABLE_DEADLINES_ID
        });

        for (let i = 0; i < response.results.length; i++){
            // console.log(response.results[i]['properties']['Person']['people'][0]['name']);
            if (response.results[i]['properties']['Deadline']['date'] != null){
<<<<<<< HEAD
                console.log(response.results[i]['created_time']);
                // console.log("> Deadline Title: ", response.results[i]['properties']['Task']['title'][0]['plain_text']);
                // // console.log(response.results[i]['properties']['Taskee']['people']);
                
                // // Print all the names of the people in a deadline
                // const peopleArray = response.results[i]['properties']['Taskee']['people'];
                // for (let j = 0; j < peopleArray.length; j++){
                //     console.log('Officer Name: ', peopleArray[j]['name']);
                //     console.log('Email: ', peopleArray[j]['person']['email']);
                //     console.log();
                // }

                // console.log('Finish Date: ', response.results[i]['properties']['Deadline']['date']['start']);    
                console.log('======================================================');
=======
                if (response.results[i]['properties']['Task']['title'][0]['plain_text'].includes(deadline))
                {
                    console.log("> Deadline Title: ", response.results[i]['properties']['Task']['title'][0]['plain_text']);
                    // console.log(response.results[i]['properties']['Taskee']['people']);
                    
                    // Print all the names of the people in a deadline
                    const peopleArray = response.results[i]['properties']['Taskee']['people'];
                    for (let j = 0; j < peopleArray.length; j++){
                        console.log('Officer Name: ', peopleArray[j]['name']);
                        console.log('Email: ', peopleArray[j]['person']['email']);
                        console.log();
                    }

                    console.log('Finish Date: ', response.results[i]['properties']['Deadline']['date']['start']);    
                    console.log('\n======================================================');
                }
>>>>>>> 3aae6120aa8cb11e3bad2aa0610c799eb3799ba0
            }
        }
    }

    getTask = async (name) => {
        console.log("Searching for " + name + "'s task...");
        
        const response = await notion.databases.query({
            database_id: TABLE_DEADLINES_ID
        });
    
        for (let i = 0; i < response.results.length; i++){
            // console.log(response.results[i]['properties']['Person']['people'][0]['name']);
            if (response.results[i]['properties']['Deadline']['date'] != null)
            {
                const peopleArray = response.results[i]['properties']['Taskee']['people'];
                for (let j = 0; j < peopleArray.length; j++){
                    if (peopleArray[j]['name'] != null)
                    {
                        if (peopleArray[j]['name'].includes(name))
                        {
                            console.log('\n======================================================');
                            console.log();
                            console.log(response.results[i]['properties']['Task']['title'][0]['plain_text']);
                            console.log('Finish Date: ', response.results[i]['properties']['Deadline']['date']['start']);
                        }
                    }
                }
            }
        }
        console.log('\n======================================================');
    }
    

    getDueDate = async (deadline) => 
    {
        const response = await notion.databases.query({
            database_id: TABLE_DEADLINES_ID
        });
    
        for (let i = 0; i < response.results.length; i++)
        {
            // console.log(response.results[i]['properties']['Person']['people'][0]['name']);
            if (response.results[i]['properties']['Deadline']['date'] != null)
            {
                if (response.results[i]['properties']['Task']['title'][0]['plain_text'].includes(deadline))
                {
                    console.log('Finish Date: ', response.results[i]['properties']['Deadline']['date']['start']);
                }
            }
        };
    }
}








//ALL CODE BELOW IS FOR TESTING:

database1 = new NotionDatabase(TABLE_DEADLINES_ID);

//database1.getTask("Afraz");
database1.parseNotionId("jsaleh849@insite.4cd.edu");

//jsaleh849@insite.4cd.edu

/*
(async() => {
    const response = await notion.databases.query({
        database_id: TABLE_DEADLINES_ID
    });
    console.log(response.results[0]['properties']['Taskee']['people'][1]['id']);

    
})();
*/

//checkDataBase();
