const { MongoDBWrapper } = require("../../mongo");
const { queries } = require("./queries");

const COLLECTION_NAME = process.env.USER_REGISTRY_COLLECTION_NAME; //This ought to be defined in an .env file;
let MongoDBClient = null;
let Collection = null;
let Dependencies = null;

class UserRegistry {
  constructor(DependencyList) {
    Dependencies = { Discord: DependencyList?.Discord };
    if (MongoDBClient === null) MongoDBClient = new MongoDBWrapper();
  }
  async close() {
    await MongoDBClient.close();
  }
  async connect() {
    const result = {
      status: null,
      error: null,
    };
    try {
      if (Collection) return;
      Collection = await MongoDBClient.connect(COLLECTION_NAME);
      Dependencies.UserRegistry = Collection;
      this.queries = queries(Dependencies);
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
