"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Menu.belongsTo(models.Category);
      Menu.hasMany(models.Ingredient);
    }
  }
  Menu.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "A menu with that name already existed!",
        },
        validate: {
          notNull: {
            msg: "Menu name is empty!",
          },
          notEmpty: {
            msg: "Menu name is empty!",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Description is empty",
          },
          notEmpty: {
            msg: "Description is empty",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Price is empty!",
          },
          notEmpty: {
            msg: "Price is empty!",
          },
          min: {
            args: 5,
            msg: "Minimum price is $5",
          },
        },
      },
      imgUrl: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Image is empty!",
          },
          notEmpty: {
            msg: "Image is empty!",
          },
        },
      },
      mongoUserId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "User can't be empty",
          },
          notNull: {
            msg: "User can't be empty",
          },
        },
      },
      CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Category",
          key: "id",
        },
        validate: {
          notNull: {
            msg: "Must pick a category",
          },
          notEmpty: {
            msg: "Must pick a category",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Menu",
    }
  );
  return Menu;
};
