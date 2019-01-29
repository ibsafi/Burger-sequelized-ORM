module.exports = function (sequelize, DataTypes) {
  var burgers = sequelize.define("burgers", {
    burger_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    devoured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  });

  burgers.associate = function (models) {
    // We're saying that a burgers should belong to an customers
    // A burgers can't be created without an customers due to the foreign key constraint
    burgers.belongsTo(models.customers, {
      foreignKey: {
        allowNull: false,
        defaultValue: 1
      }
    });
  };
  return burgers;
};
