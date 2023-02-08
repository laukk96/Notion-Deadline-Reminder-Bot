const { Schema } = require("../lib/Schema");
const CLUB_DESCRIPTION_LENGTH = null;

const Club = {
  club_name: null,
  club_description: null,
  initiated_date: null,
  notion_integration_key: null,
  database_id: null,
  deadline_property_name: null,
  task_property_name: null,
};


Club.club_name = (club_name) => {
  if (typeof club_name === "string") {
    return club_name;
  } else {
    throw "club_name has to be a string.";
  }
};

Club.club_description = (club_description) => {
  if (typeof club_description === "string") {
    if (CLUB_DESCRIPTION_LENGTH !== null) {
      if (club_description <= CLUB_DESCRIPTION_LENGTH) return club_description;
      else throw "club_description is too long";
    } else return club_description;
  } else {
    throw "club_description has to be a string.";
  }
};

Club.initiated_date = (initiated_date) => {
  if (typeof initiated_date === "string") {
    return initiated_date;
  } else {
    throw "initiated_date has to be a string.";
  }
};

Club.notion_integration_key = (notion_integration_key) => {
  if (typeof notion_integration_key === "string") {
    return notion_integration_key;
  } else {
    throw "notion_integration_key has to be a string.";
  }
};

Club.database_id = (database_id) => {
  if (typeof database_id === "string") {
    return database_id;
  } else {
    throw "database_id has to be a string.";
  }
};

Club.deadline_property_name = (deadline_property_name) => {
  if (typeof deadline_property_name === "string") {
    return deadline_property_name;
  } else {
    throw "deadline_property_name has to be a string.";
  }
};

Club.task_property_name = (task_property_name) => {
  if (typeof task_property_name === "string") {
    return task_property_name;
  } else {
    throw "task_property_name has to be a string.";
  }
};

const ClubSchema = new Schema(Club);

module.exports = { ClubSchema };
