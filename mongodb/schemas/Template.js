const { Schema } = require("../lib/Schema");

const Template = {
  // guild_id: null,
};

// Template.guild_id = (context) => {
//   if (typeof context === "string") {
//     return context;
//   } else {
//     throw "Guild Id has to be a string.";
//   }
// };

const TemplateSchema = new Schema(Template);

module.exports = { TemplateSchema };
