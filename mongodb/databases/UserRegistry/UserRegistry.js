const { MongoDBWrapper } = require("../../mongo");
const { queries } = require("./queries");
const DATABASE_NAME = ""; //This ought to be defined in an .env file;

let MongoDBClient = null;
export class UserRegistry {
  constructor() {
    if (MongoDB === null) MongoDBClient = new MongoDBWrapper();
    this.close = MongoDBClient.close;
    this.queries = queries(MongoDBClient);
  }
  async connect() {
    try {
      await MongoDB.connect(DATABASE_NAME);
    } catch (error) {
      //Define what happens when there is an error
    }
  }
}
