const user = (data) => {
  let user_data = {
    name: null,
    notion_id: null,
    email: null,
    discord_id: null,
    uid: null,
  };
  Object.keys(user_data).forEach((key) => {
    if (data[key]) user_data[key] = data[key];
  });
  //This only grabs data relevant and regular to the user, hence it being a "schema".
  //TODO: filter fields.
  return user_data;
};
module.exports = { user };
