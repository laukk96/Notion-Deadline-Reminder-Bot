const { MongoDBWrapper } = require("../../mongo");
const { queries } = require("./queries");

const COLLECTION_NAME = process.env.USER_REGISTRY_COLLECTION_NAME; //This ought to be defined in an .env file;
let MongoDBClient = null;
let Collection = null;
class UserRegistry {
  constructor() {
    if (MongoDBClient === null) MongoDBClient = new MongoDBWrapper();
    this.close = MongoDBClient.close;
  }
  async connect() {
    const result = {
      status: null,
      error: null,
    };
    try {
      if (Collection) return;
      Collection = await MongoDBClient.connect(COLLECTION_NAME);
      this.queries = queries(Collection);
      result.status = 1;
    } catch (error) {
      result.status = 0;
      result.error = error; //TODO: Don't respond with error obj.
      //Define what happens when there is an error
    } finally {
      return result;
    }
  }
}

module.exports = { UserRegistry };
