const { UserSchema } = require("../../../schemas/User");
const get_user = ({ UserRegistry }) =>
  async function ({ server_id, data }) {
    let result = {
      status: null,
      error: null,
      payload: null,
    }; //This object will notify the end user the result of their query.
    let User = UserSchema.intersect(data); //Only allow properties that are also in UserSchema and are not null.
    User.discord_id = User.discord_id.toString()
    //TODO: Validate Strings
    //Put Precedence in checking by id.
    try {
      result.status = 1;
      let payload = (
        await UserRegistry.findOne({
          _id: server_id,
        })
      );
      console.log("UserRegistry: get_user.js || Return from payload: UserRegistry: ", payload);
      console.log('UserRegistry: User Schema Object: \n\t', User, '\n\t', User.discord_id);
      console.log("Before: Payload = ", payload);
      console.log("Key Inside Payload = ", payload[ User.discord_id.toString() ]);
      payload = payload[ User.discord_id.toString() ];
      result.payload = UserSchema.exclude(payload); //Force all the properties of UserSchema
      
      console.log('UserRegistry: What is the resulting payload? ', result.payload, '\n');
      return result;
    } catch (error) {
      result.status = 0;
      result.error = error; //TODO: Replace error
      return result;
    }
  };
module.exports = { get_user };
