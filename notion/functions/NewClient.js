const { Client } = require("@notionhq/client");

module.exports = (notion_key) => {
  this.notion = new Client({
    auth: notion_key,
  });
};
