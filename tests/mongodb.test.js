const {
  UserRegistry,
} = require("../mongodb/databases/UserRegistry/UserRegistry");

const tests = async () => {
  const USER_REGISTRY_DATABASE = new UserRegistry();
  await connect(USER_REGISTRY_DATABASE);
  await create(USER_REGISTRY_DATABASE);
  await get(USER_REGISTRY_DATABASE);
  await close(USER_REGISTRY_DATABASE);
};
tests();

async function connect(USER_REGISTRY_DATABASE) {
  const payload = await USER_REGISTRY_DATABASE.connect();
  console.log("TEST_MONGODB_CONNECT:", payload);
}

async function create(USER_REGISTRY_DATABASE) {
  const data = {
    name: "John",
    notion_id: "123",
    email: "John@insite.4cd.edu",
    discord_id: "123123123",
    uid: "awedawdaw",
  };
  const result = await USER_REGISTRY_DATABASE.queries.create.user(data);
  console.log("TEST_MONGODB_STORE:", result);
}
async function get(USER_REGISTRY_DATABASE) {
  const data = {
    name: "John",
    notion_id: "123",
    email: "John@insite.4cd.edu",
    discord_id: "123123123",
    uid: "awedawdaw",
  };
  const result = await USER_REGISTRY_DATABASE.queries.get.user(data);
  console.log("TEST_MONGODB_GET:", result);
}

async function close(USER_REGISTRY_DATABASE) {
  let result = await USER_REGISTRY_DATABASE.close();
  console.log("TEST_MONGODB_GET:", result);
}
