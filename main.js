const {
  UserRegistry,
  DeadlineHistory,
  DeadlineHistory,
} = require("./mongodb/databases");
const UserRegistryDatabase = new UserRegistry();
const DeadlineHistoryDatabase = new DeadlineHistory();

const query = async function () {
  const payload = await UserRegistryDatabase.connect();
  if (payload.error) return;
  UserRegistryDatabase.queries.create.user({
    name: "Asdawdaw",
    notion_id: "Awdawdaw",
  });

  UserRegistryDatabase.close();
};

//UserRegistryDatabase.close();
