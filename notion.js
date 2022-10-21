require('dotenv').config('/.env');
const { Client } = require("@notionhq/client");
const { getDatabase } = require('@notionhq/client/build/src/api-endpoints');

// const databaseId = process.env.NOTION_DATABASE_ID;
// How to share a database with an notion integration/connection? 
const TABLE_DEADLINES_ID = "0f201482f6f1407899e8f7c8ae7dea28";
//GDSC f944e134b0584cc289d0a97775384d76
//NOTION DEV TEAM 0f201482f6f1407899e8f7c8ae7dea28

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
//locates a person's index
getIndex = async (name) => {
    const payload = {
        path: `databases/${TABLE_DEADLINES_ID}/query`,
        method: 'POST'
    }
    

    const {results} = await notion.request(payload)

    const people = results.map(page => {
        return page.properties.Person.people[0].name
    })

    people.forEach((item, index, arr) => {
        if (item.includes(name))
        {
            personIndex = index
        }
    });

    return personIndex
}


class NotionDatabase {

    constructor (connectDatabase)
    {
        this.connectDatabase = connectDatabase
        console.log("The NotionDatabase is being created!");
        (async () => {
            const response = await notion.databases.query({
                database_id: connectDatabase
            });
        
            //console.log(response.results[1]['properties']['Person']);
        })();
    }
    
    //sendDeadlines() =>

    getPerson = async (name) => {
        let personName;
        let personIndex;
        
        console.log("Getting " + name + "...")
        
        const payload = {
            path: `databases/${TABLE_DEADLINES_ID}/query`,
            method: 'POST'
        }
        
        const {results} = await notion.request(payload)

        
        const peopleNameList = results.map(page => {
            return page.properties.Person.people[0].name

        })

        const personID = results.map(page => {
            return page.properties.Person.people[0].id
        })
        
        peopleNameList.forEach((item, index, arr) => {
            if (item.includes(name))
            {
                personName = item
                personIndex = index
            }
        });


        return personName +", ID: " + personID[personIndex]
        
        /*
        for (let i = 0; i < peopleList.length; i++)
    {
            if (peopleList[i].indexOf(name) == i)
            {
                personName = peopleList[i]
                console.log(personName)
            } else {
                console.log("Invalid")
            }
    }
    */
    }

    getTask = async (name) => {
        console.log("Getting " + name + " task...")
        
        const response = await notion.databases.query({
            database_id: TABLE_DEADLINES_ID
        });
    
        const indexLoc = await getIndex(name);

        return response.results[indexLoc]['properties']['Tasks']['rich_text'][0]['text']['content'];
        
    }

    getStatus = async (name) => {
        let personStatus;

        const payload = {
            path: `databases/${TABLE_DEADLINES_ID}/query`,
            method: 'POST'
        }
        

        const {results} = await notion.request(payload)

        const indexLoc = await getIndex(name);

        const status = results.map(page => {
            return page.properties.Status.checkbox
        })

        status.forEach((item, index, arr) => {
            if (index == indexLoc)
            {
                personStatus = item
            }
        });

        if (personStatus == true)
        {
            return name + " has this task completed."
        } else {
            return name + " has this task incomplete."
        }

    }

    getDueDate = async (name) => {
    
        console.log("Getting " + name + " due date...")
        
        const response = await notion.databases.query({
            database_id: TABLE_DEADLINES_ID
        });
    
        const indexLoc = await getIndex(name);

        return response.results[indexLoc]['properties']['Finish Date']['date']['end'];
        
    }

}








//ALL CODE BELOW IS FOR TESTING:

database1 = new NotionDatabase(TABLE_DEADLINES_ID);

(async() => {
    const response = await notion.databases.query({
        database_id: TABLE_DEADLINES_ID
    });

    const tester = await database1.getTask("Kon");
    console.log(tester);
})();

//checkDataBase();
