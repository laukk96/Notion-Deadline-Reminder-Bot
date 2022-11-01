const { Schema } = require("../lib/Schema");
const CLUB_DESCRIPTION_LENGTH = null;
const ClubInfo = {
  guild_id: null,
  club_name: null,
  club_description: null,
  initiated_date: null,
  notion_integration_key: null,
};

ClubInfo.guild_id = (guild_id) => {
  if (typeof guild_id === "string") {
    return guild_id;
  } else {
    throw "guild_id has to be a string.";
  }
};
ClubInfo.club_name = (club_name) => {
  if (typeof club_name === "string") {
    return club_name;
  } else {
    throw "club_name has to be a string.";
  }
};
ClubInfo.club_description = (club_description) => {
  if (typeof club_description === "string") {
    if (CLUB_DESCRIPTION_LENGTH !== null) {
      if (club_description <= CLUB_DESCRIPTION_LENGTH) return club_description;
      else throw "club_description is too long";
    } else return club_description;
  } else {
    throw "club_description has to be a string.";
  }
};

ClubInfo.initiated_date = (initiated_date) => {
  if (typeof initiated_date === "string") {
    return initiated_date;
  } else {
    throw "initiated_date has to be a string.";
  }
};
ClubInfo.notion_integration_key = (notion_integration_key) => {
  if (typeof notion_integration_key === "string") {
    return notion_integration_key;
  } else {
    throw "notion_integration_key has to be a string.";
  }
};

const ClubInfoSchema = new Schema(ClubInfo);
module.exports = { ClubInfoSchema };
