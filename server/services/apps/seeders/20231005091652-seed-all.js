"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const categories = require("../data/categories.json");
    const dataCategories = categories.map((el) => {
      el.createdAt = el.updatedAt = new Date();
      return el;
    });
    await queryInterface.bulkInsert("Categories", dataCategories, {});

    const menus = require("../data/menus.json");
    const dataMenu = menus.map((el) => {
      el.createdAt = el.updatedAt = new Date();
      return el;
    });
    await queryInterface.bulkInsert("Menus", dataMenu, {});

    const ingredients = require("../data/ingredients.json");
    const dataIngredient = ingredients.map((el) => {
      el.createdAt = el.updatedAt = new Date();
      return el;
    });
    await queryInterface.bulkInsert("Ingredients", dataIngredient, {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
    await queryInterface.bulkDelete("Menus", null, {});
    await queryInterface.bulkDelete("Ingredients", null, {});
  },
};
