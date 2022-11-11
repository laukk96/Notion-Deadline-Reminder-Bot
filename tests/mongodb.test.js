const { UserRegistry, DeadlineHistory } = require("../mongodb/collections");

const tests = async () => {
  await UserRegistryDatabase();
  //await DeadlineHistoryDatabase();
};
tests();

async function UserRegistryDatabase() {
  //tests-------------------------------------------//
  const USER_REGISTRY_DATABASE = new UserRegistry();
  await connect(USER_REGISTRY_DATABASE);
  await create(USER_REGISTRY_DATABASE);
  //await get(USER_REGISTRY_DATABASE);
  //await close(USER_REGISTRY_DATABASE);

  //unit tests--------------------------------------//
  async function connect(USER_REGISTRY_DATABASE) {
    const payload = await USER_REGISTRY_DATABASE.connect();
    console.log("TEST_MONGODB_CONNECT:", payload);
  }

  // Just for Notion
  async function create(USER_REGISTRY_DATABASE) {
    const data = {
      name: "John",
      notion_id: "123",
      discord_id: "123123123",
    };
    const result = await USER_REGISTRY_DATABASE.queries.create.user({
      data: data,
      server_id: "1019361421642965014",
    });
    console.log("TEST_MONGODB_STORE:", result);
  }
  
  async function get(USER_REGISTRY_DATABASE) {
    const data = {
      email: "epidemeus@gmail.com",
    };
    const result = await USER_REGISTRY_DATABASE.queries.get.user(data);
    console.log("TEST_MONGODB_GET:", result);
  }

  async function close(USER_REGISTRY_DATABASE) {
    let result = await USER_REGISTRY_DATABASE.close();
    console.log("TEST_MONGODB_CLOSE:", result);
  }
}

async function DeadlineHistoryDatabase() {
  //tests-------------------------------------------//
  const DEADLINE_HISTORY_DATABASE = new DeadlineHistory();
  await connect(DEADLINE_HISTORY_DATABASE);
  await create(DEADLINE_HISTORY_DATABASE);
  await get(DEADLINE_HISTORY_DATABASE);
  await get_n(DEADLINE_HISTORY_DATABASE);
  await update(DEADLINE_HISTORY_DATABASE);
  await get_recent(DEADLINE_HISTORY_DATABASE);
  await close(DEADLINE_HISTORY_DATABASE);

  //unit tests--------------------------------------//
  async function connect(DEADLINE_HISTORY_DATABASE) {
    const payload = await DEADLINE_HISTORY_DATABASE.connect();
    console.log("TEST_MONGODB_CONNECT:", payload);
  }
  async function create(DEADLINE_HISTORY_DATABASE) {
    const data = {
      user_id: 31415926,
      date_assigned: "too early",
      finish_date: "too soon",
      text: "nooooo",
    };
    const result = await DEADLINE_HISTORY_DATABASE.queries.create.deadline(
      data
    );
    console.log("TEST_MONGODB_STORE:", result);
  }
  async function get(DEADLINE_HISTORY_DATABASE) {
    const data = {
      user_id: 31415926,
    };
    const result = await DEADLINE_HISTORY_DATABASE.queries.get.deadline(data);
    console.log("TEST_MONGODB_GET:", result);
  }
  async function get_n(DEADLINE_HISTORY_DATABASE) {
    const n = 10;
    const result = await DEADLINE_HISTORY_DATABASE.queries.get.n_deadlines(n);
    console.log("TEST_MONGODB_GET_N:", result);
  }
  async function get_recent(DEADLINE_HISTORY_DATABASE) {
    const result =
      await DEADLINE_HISTORY_DATABASE.queries.get.recent_deadline();
    console.log("TEST_MONGODB_GET_RECENT:", result);
  }
  async function update(DEADLINE_HISTORY_DATABASE) {
    const query = {
      user_id: 31415926,
    };
    const data = {
      user_id: 31415926,
      date_assigned: "too late",
      finish_date: "too late",
      text: "yesssss",
    };
    const result = await DEADLINE_HISTORY_DATABASE.queries.update.deadline(
      query,
      data
    );
    console.log("TEST_MONGODB_UPDATE", result);
  }
  async function close(DEADLINE_HISTORY_DATABASE) {
    let result = await DEADLINE_HISTORY_DATABASE.close();
    console.log("TEST_MONGODB_CLOSE:", result);
  }
}
