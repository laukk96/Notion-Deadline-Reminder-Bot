require("dotenv").config("/.env");
const chalk = require("chalk");
const { ClubInfo } = require("../mongodb/collections/ClubInfo/ClubInfo.js");

const GetDeadlinesForEmail = require("./functions/GetDeadlinesForEmail");
const getDueDate = require("./functions/getDueDate");
const getPerson = require("./functions/getPerson");
const getTask = require("./functions/getTask");
const checkDataBase = require("./functions/checkDatabase");
const PushDeadlines = require("./functions/PushDeadlines");
const AddUser = require("./functions/AddUser");

const ClubInfoDatabase = new ClubInfo();
ClubInfoDatabase.connect();

const { Client } = require("@notionhq/client");
notion = new Client({
  auth: process.env.NOTION_KEY,
});

const TABLE_DEADLINES_ID = "f944e134b0584cc289d0a97775384d76";

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

// Old: f944e134b0584cc289d0a97775384d76
// New: beb4f1b15ec1443c87e16bd138832d06

//GDSC f944e134b0584cc289d0a97775384d76
//NOTION DEV TEAM 0f201482f6f1407899e8f7c8ae7dea28

// TODO: Change the Notion Variable to be compatible with different servers

// just to check the objects in the properties

class NotionDatabase {
  constructor(TABLE_ID) {
    this.notion = new Client({
      auth: process.env.NOTION_KEY,
    });

    // this.connectDatabase = connectDatabase;
    this.connectDatabase = TABLE_ID;
    // TODO: Fix this so that it is scaleable with other servers

    (async () => {
      const response = await this.notion.databases.query({
        database_id: this.connectDatabase,
      });
    })();
  }

  AddUser = AddUser;

  PushDeadlines = PushDeadlines;

  GetDeadlinesForEmail = GetDeadlinesForEmail;

  getPerson = getPerson;

  getTask = getTask;

  getDueDate = getDueDate;
}

//ALL CODE BELOW IS FOR TESTING:

database1 = new NotionDatabase(TABLE_DEADLINES_ID);

//database1.getTask("Afraz");
// console.log( chalk.greenBright(`${database1.GetDeadlinesForEmail("jsaleh849@insite.4cd.edu")}`) );

module.exports = { NotionDatabase };
//jsaleh849@insite.4cd.edu
