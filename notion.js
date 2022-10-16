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
                database_id: connectDatabase
            });
        
            //console.log(response.results[1]['properties']['Person']);
        })();
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

    getPerson = async (name) => {
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

    getStatus = async (name) => {
        const payload = {
            path: `databases/${TABLE_DEADLINES_ID}/query`,
            method: 'POST'
        }
        

        const {results} = await notion.request(payload)

        const indexLoc = await getIndex(name);

        const status = results.map(page => {
            tmpStatus = page.properties.Status.checkbox

            return tmpStatus
        })

        status.forEach((item, index, arr) => {
            if(index == indexLoc)
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

}






//ALL CODE BELOW IS FOR TESTING:

database1 = new NotionDatabase(TABLE_DEADLINES_ID);

database1.getPerson("Jay");

/*
(async() => {
    const somePerson = await getPerson("Jay")
    console.log(somePerson)
})();
*/
/*
someFunc = async () => {
   

    const payload = {
        path: `databases/${TABLE_DEADLINES_ID}/query`,
        method: 'POST'
    }
    
    const {results} = await notion.request(payload)

    
    const peopleList = results.map(page => {
        tmpList = page.properties.Person.people[0].name

        return tmpList
    })

    return peopleList
}

(async() => {
    const test = await someFunc()
    console.log(test)
})();



//checkDataBase()

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