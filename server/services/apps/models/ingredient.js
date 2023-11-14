"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ingredient.belongsTo(models.Menu);
    }
  }
  Ingredient.init(
    {
      MenuId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Menus",
          key: "id",
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please add ingredient",
          },
          notEmpty: {
            msg: "Please add ingredient",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Ingredient",
    }
  );
  return Ingredient;
};
