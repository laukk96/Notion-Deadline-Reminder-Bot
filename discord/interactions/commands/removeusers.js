// This function takes in an interaction parameter and creates a new ActionRowBuilder,
// sets the components of the ActionRowBuilder to a SelectMenuBuilder,
// sets the customId of the SelectMenuBuilder to "removeme",
// and sets the options of the SelectMenuBuilder to a list of label/value pairs.
// The interaction is then replied with the ActionRowBuilder component.
function removeusers(interaction) {
  const actionRowComponent = new ActionRowBuilder().setComponents(
    new SelectMenuBuilder().setCustomId("removeme").setOptions([
      {
        label: "removeName",
        value: "name",
      },
      {
        label: "removeEmail",
        value: "email",
      },
    ])
  );
  interaction.reply({
    components: [actionRowComponent.toJSON()],
  });
}

// The removeusers function is then exported.
module.exports = removeusers;
