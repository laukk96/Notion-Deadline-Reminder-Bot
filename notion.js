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