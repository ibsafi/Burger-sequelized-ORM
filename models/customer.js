module.exports = function (sequelize, DataTypes) {
    var customers = sequelize.define("customers", {
        customer_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });


    customers.associate = function (models) {
        // Associating customers with burgers
        // When an customers is deleted, also delete any associated burgers
        customers.hasMany(models.burgers, {
            onDelete: "cascade"
        });
    };

    return customers;
};
