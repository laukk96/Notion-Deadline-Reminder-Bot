export default get_user = (MongoDB) =>
  function (config) {
    const { name, id } = config; //Search parameters
    //TODO: Validate Strings
    if (id) {
      //Put Precedence in checking by id.
      try {
      } catch (error) {}
    } else if (name) {
      try {
      } catch (error) {}
    }
  };
