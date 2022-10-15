const { SlashCommandAttachmentOption } = require("discord.js");
const { MongoClient } = require("mongodb");
let Client = null;
const URI = ""; //Should receive data from .env file
//TODO: Remove above comment.

// This is put outside of the object so that it's visibility is limited, i.e. private.
//User is then forced to utilize the interface we design for them, allowing us to ensure that they can use
//the client safely with respect to our protocols.
export class MongoDBWrapper {
  constructor() {
    this.Databases = Databases;
    if (Client !== null) return;
    Client = new MongoClient(URI);
  }
  async connect(database_name) {
    try {
      await Client.connect().catch();
      await Client.db(database_name);
    } catch (error) {
      //Define what happens when there is an error
    }
  }
  async close() {
    try {
      if (Client) await Client.close();
    } catch (error) {
      //Define what happens when there is an error
    } finally {
      Client = null;
    }
  }
}
