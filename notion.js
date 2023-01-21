require("dotenv").config("/.env");
const { Client } = require("@notionhq/client");
const { getDatabase } = require("@notionhq/client/build/src/api-endpoints");
const { ThreadAutoArchiveDuration, time } = require("discord.js");
const chalk = require("chalk");

const { ClubInfo } = require("./mongodb/collections/ClubInfo/ClubInfo.js");
const ClubInfoDatabase = new ClubInfo();
ClubInfoDatabase.connect();

console.log("AFTER connect()");

// EXAMPLE: How to use the Asyncronous Collection Methods: 
setTimeout(async () => {
  // TODO: Add await for testing get_info() in notion.js
  const result = await ClubInfoDatabase.queries.get.info({
    server_id: "1019361421642965013",
  });
//   console.log(`The Payload Results: ${result.payload}`);
//   for (const [key, value] of Object.entries(result.payload)) {
//     console.log(`${key}, ${value}`);
//   }
  // console.log(result.payload["notion_integration_key"]);
}, 3000);   

// const databaseId = process.env.NOTION_DATABASE_ID;
// How to share a database with an notion integration/connection?
const TABLE_DEADLINES_ID = "f944e134b0584cc289d0a97775384d76";

// Old: f944e134b0584cc289d0a97775384d76
// New: beb4f1b15ec1443c87e16bd138832d06

//GDSC f944e134b0584cc289d0a97775384d76
//NOTION DEV TEAM 0f201482f6f1407899e8f7c8ae7dea28

// TODO: Change the Notion Variable to be compatible with different servers
notion = new Client({
  auth: process.env.NOTION_KEY,
});

// just to check the objects in the properties
const checkDataBase = async () => {
  const response = await notion.databases.query({
    database_id: this.connectDatabase,
  });

  for (let i = 0; i < response.results.length; i++) {
    // console.log(response.results[i]['properties']['Person']['people'][0]['name']);
    if (response.results[i]["properties"]["Deadline"]["date"] != null) {
      console.log(
        "> Deadline Title: ",
        response.results[i]["properties"]["Task"]["title"][0]["plain_text"]
      );
      // console.log(response.results[i]['properties']['Taskee']['people']);

      // Print all the names of the people in a deadline
      const peopleArray = response.results[i]["properties"]["Taskee"]["people"];
      for (let j = 0; j < peopleArray.length; j++) {
        console.log("Officer Name: ", peopleArray[j]["name"]);
        //console.log('Email: ', peopleArray[j]['person']['email']);
        console.log();
      }

      console.log(
        "Finish Date: ",
        response.results[i]["properties"]["Deadline"]["date"]["start"]
      );
      console.log("\n======================================================");
    }
  }
};

// Give an array a function: METATABLE
const createSortFunction = (arr) => {
  arr.insert = function(newDeadline){
    arr.push(newDeadline);
  };
}
class NotionDatabase {
  constructor(connectDatabase) {
    this.notion = new Client({
      auth: process.env.NOTION_KEY,
    });

    // this.connectDatabase = connectDatabase;
    this.connectDatabase = TABLE_DEADLINES_ID;
    // TODO: Fix this so that it is scaleable with other servers

    (async () => {
      const response = await this.notion.databases.query({
        database_id: this.connectDatabase,
      });
    })();
  }

  AddUser = async (server_id, info) => {};

  PushDeadlines = async () => {};

  GetDeadlinesForEmail = async (email) => {
    const response = await notion.databases.query({
      database_id: this.connectDatabase,
    });
    
    var allUserDeadlines = [];
    // createSortFunction(allUserDeadlines);

    outerloop: for (let i = 0; i < response.results.length; i++) {
      const  properties = response.results[i]["properties"];
      const task = properties["Task"];
      const deadline = properties["Deadline"];

      if (deadline["date"] != null) {
        const peopleArray = properties["Taskee"]["people"];
        let j = 0;
        while (j < peopleArray.length) {
          // Make sure the object has a person and email property
          if ("person" in peopleArray[j] && "email" in peopleArray[j]["person"]) {
            if (peopleArray[j]["person"]["email"].includes(email)) {
              // Create a deadline dictionary, with name / Date object
              var deadline_dict = {
                name: task["title"][0]["plain_text"],
                date: new Date(deadline["date"]["start"]),
              };
              
              // Add it to the array of deadlines
              allUserDeadlines.push(deadline_dict);
              continue outerloop;
            }
          }
          j++;
        }
      }
    }
    //console.log(response.results[deadLineIndex]['properties']['Taskee'][personIndex]['people']['id']);
    // SOURCE Date Sort: https://masteringjs.io/tutorials/fundamentals/sort-by-date#:~:text=Similarly%2C%20sorting%20an%20array%20of,in%20the%20sort()%20callback. 
    allUserDeadlines.sort((a, b) => b.date - a.date);
    console.log(allUserDeadlines);
    return allUserDeadlines;
  };

  getPerson = async (deadline) => {
    const response = await notion.databases.query({
      database_id: this.connectDatabase,
    });

    for (let i = 0; i < response.results.length; i++) {
      if (response.results[i]["properties"]["Deadline"]["date"] != null) {
        if (
          response.results[i]["properties"]["Task"]["title"][0][
            "plain_text"
          ].includes(deadline)
        ) {
          console.log(
            "> Deadline Title: ",
            response.results[i]["properties"]["Task"]["title"][0]["plain_text"]
          );
          // console.log(response.results[i]['properties']['Taskee']['people']);

          // Print all the names of the people in a deadline
          const peopleArray =
            response.results[i]["properties"]["Taskee"]["people"];
          for (let j = 0; j < peopleArray.length; j++) {
            console.log("Officer Name: ", peopleArray[j]["name"]);
            console.log("Email: ", peopleArray[j]["person"]["email"]);
            console.log();
          }

          console.log(
            "Finish Date: ",
            response.results[i]["properties"]["Deadline"]["date"]["start"]
          );
          console.log(
            "\n======================================================"
          );
        }
      }
    }
  };

  getTask = async (name) => {
    console.log("Searching for " + name + "'s task...");

    const response = await notion.databases.query({
      database_id: this.connectDatabase,
    });

    for (let i = 0; i < response.results.length; i++) {
      // console.log(response.results[i]['properties']['Person']['people'][0]['name']);
      if (response.results[i]["properties"]["Deadline"]["date"] != null) {
        const peopleArray =
          response.results[i]["properties"]["Taskee"]["people"];
        for (let j = 0; j < peopleArray.length; j++) {
          if (peopleArray[j]["name"] != null) {
            if (peopleArray[j]["name"].includes(name)) {
              console.log(
                "\n======================================================"
              );
              console.log();
              console.log(
                response.results[i]["properties"]["Task"]["title"][0][
                  "plain_text"
                ]
              );
              console.log(
                "Finish Date: ",
                response.results[i]["properties"]["Deadline"]["date"]["start"]
              );
            }
          }
        }
      }
    }
    console.log("\n======================================================");
  };

  getDueDate = async (deadline) => {
    const response = await notion.databases.query({
      database_id: this.connectDatabase,
    });

    for (let i = 0; i < response.results.length; i++) {
      // console.log(response.results[i]['properties']['Person']['people'][0]['name']);
      if (response.results[i]["properties"]["Deadline"]["date"] != null) {
        if (
          response.results[i]["properties"]["Task"]["title"][0][
            "plain_text"
          ].includes(deadline)
        ) {
          console.log(
            "Finish Date: ",
            response.results[i]["properties"]["Deadline"]["date"]["start"]
          );
        }
      }
    }
  };
}

//ALL CODE BELOW IS FOR TESTING:

database1 = new NotionDatabase(TABLE_DEADLINES_ID);

//database1.getTask("Afraz");
// console.log( chalk.greenBright(`${database1.GetDeadlinesForEmail("jsaleh849@insite.4cd.edu")}`) );

module.exports = { NotionDatabase };
//jsaleh849@insite.4cd.edu
