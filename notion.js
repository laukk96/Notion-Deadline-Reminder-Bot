<<<<<<< HEAD
require('dotenv').config('/.env');

const { Client } = require("@notionhq/client")

const notion = new Client({
    auth: process.env.NOTION_KEY, 
})

const { getDatabase } = require('@notionhq/client/build/src/api-endpoints');

// const databaseId = process.env.NOTION_DATABASE_ID;
// How to share a database with an notion integration/connection? 
const TABLE_DEADLINES_ID = "f944e134b0584cc289d0a97775384d76";
//GDSC f944e134b0584cc289d0a97775384d76
//NOTION DEV TEAM 0f201482f6f1407899e8f7c8ae7dea28




//console.log(response.results[1]['properties']['Person']);


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
    
    //pushDeadlines() =>

    getPerson = async (deadline) => {
        const response = await notion.databases.query({
            database_id: TABLE_DEADLINES_ID
        });

        for (let i = 0; i < response.results.length; i++){
            // console.log(response.results[i]['properties']['Person']['people'][0]['name']);
            if (response.results[i]['properties']['Deadline']['date'] != null){
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

/*
(async() => {
    const response = await notion.databases.query({
        database_id: TABLE_DEADLINES_ID
    });
    for (let i = 0; i < response.results.length; i++)
    {   
        if (response.results[i]['properties']['Deadline']['date'] != null)
        {
        console.log(response.results[i]['properties']['Task']['title'][0]['plain_text']);
        }
    }
    
})();
*/

database1.getTask("Afraz");

//checkDataBase();

=======
require('dotenv').config('/.env');
const { Client } = require("@notionhq/client");
const { getDatabase } = require('@notionhq/client/build/src/api-endpoints');

// const databaseId = process.env.NOTION_DATABASE_ID;
// How to share a database with an notion integration/connection? 
const TABLE_DEADLINES_ID = "0f201482f6f1407899e8f7c8ae7dea28";

const notion = new Client({
    auth: process.env.NOTION_KEY,
})

//just to check the objects in the properties
const checkDataBase = async () => {
    const payload = {
        path: `databases/${TABLE_DEADLINES_ID}/query`,
        method: 'POST'
    }

    const { results } = await notion.request(payload)

    const detailData = results.map(page => {
        console.log(page)
    })
}

class NotionDatabase {
    
    constructor (connectDatabase)
    {
        console.log("The NotionDatabase is being created!");
        (async () => {
            const response = await notion.databases.query({
                database_id: this.connectDatabase
            });
        
        // console.log(response)
        console.log("response_results inside getDatabase(): ", response.results)
        return response.results;
    }

}

//locates a person's index
getPerson = async (name) => {
    const payload = {
        path: `databases/${TABLE_DEADLINES_ID}/query`,
        method: 'POST'
    }
    

    const {results} = await notion.request(payload)

    const people = results.map(page => {
        tmpPeople = page.properties.Person.people[0].name

        return tmpPeople
    })

    people.forEach((item, index, arr) => {
        if (item == name)
        {
            personIndex = index
        }
    });

    return personIndex
}


getStatus = async (name) => {
    const payload = {
        path: `databases/${TABLE_DEADLINES_ID}/query`,
        method: 'POST'
    }
    

    const {results} = await notion.request(payload)

    const person = await getPerson(name);

    const status = results.map(page => {
        tmpStatus = page.properties.Status.checkbox

        return tmpStatus
    })

    status.forEach((item, index, arr) => {
        if(index == person)
        {
            personStatus = item + "!";
        }
    });

    return personStatus;
}


(async() => {
    const somePerson = await getStatus("Richard Azucenas")
    console.log(somePerson)
})();



//checkDataBase()

/*
(async () => {
    // How to retrieve a database? 
    // https://developers.notion.com/reference/retrieve-a-database
    const response = await notion.databases.query({
        database_id: TABLE_DEADLINES_ID
    });

    console.log(response.results[1]['properties']['Person');
})();
*/
>>>>>>> richard-api
