require("dotenv").config({ path: "../.env" });
const { MongoClient, ServerApiVersion } = require("mongodb");

const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const MONGODB_DATABASE_NAME = process.env.MONGODB_DATABASE_NAME;
const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
const MONGODB_CLUSTER = process.env.MONGODB_CLUSTER;
const URI = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}/?retryWrites=true&w=majority`;

let Client = null;
//TODO: Remove above comment.
// This is put outside of the object so that it's visibility is limited, i.e. private.
//User is then forced to utilize the interface we design for them, allowing us to ensure that they can use
//the client safely with respect to our protocols.

class MongoDBWrapper {
  constructor() {
    if (Client !== null) return; //This prevents multiple instances
    Client = new MongoClient(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    });
  }

  async connect(collection_name) {
    try {
      await Client.connect().catch();
      return await Client.db(MONGODB_DATABASE_NAME).collection(collection_name);
    } catch (error) {
      console.log(error);
      //Define what happens when there is an error
    }
  }

  async close() {
    let result = {
      status: null,
      error: null,
      payload: null,
    };
    try {
      if (Client) {
        await Client.close();
        result.status = 1;
        result.payload = "successfully closed";
        return result;
      }
    } catch (error) {
      result.status = 0;
      result.error = error; //TODO: replace error
      //Define what happens when there is an error
    } finally {
      Client = null;
    }
  }
}

module.exports = { MongoDBWrapper };
