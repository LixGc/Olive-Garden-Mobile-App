const { Menu, Category, Ingredient, sequelize } = require("../models");
class MenuController {
  static async menus(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const menus = await Menu.findAll({ include: [Category, Ingredient] }, { transaction: t });
      await t.commit();
      res.json(menus);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
  static async menuById(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      const menu = await Menu.findByPk(
        id,
        {
          include: [Category, Ingredient],
        },
        { transaction: t }
      );
      if (!menu) {
        throw { name: "Menu not found" };
      }
      await t.commit();
      res.json(menu);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async addMenu(req, res, next) {
    try {
      const result = await sequelize.transaction(async (t) => {
        const { name, description, price, imgUrl, CategoryId, ingredientName, mongoUserId } = req.body;
        const ingredients = ingredientName;
        const menu = await Menu.create({ name, description, price, imgUrl, CategoryId, mongoUserId }, { transaction: t });
        if (!ingredients) {
          throw { name: "ingredient_empty" };
        }
        const dataIngredients = ingredients.split(",").map((ingredient) => ({ name: ingredient.trim(), MenuId: menu.id }));
        await Ingredient.bulkCreate(dataIngredients, { transaction: t });
        res.status(201).json({ message: "Menu successfully created" });
        return menu;
      });
    } catch (error) {
      next(error);
    }
  }
  static async editMenu(req, res, next) {
    try {
      const result = await sequelize.transaction(async (t) => {
        const { id } = req.params;
        const menu = await Menu.findByPk(id, { transaction: t });
        if (!menu) {
          throw { name: "Menu not found" };
        }
        const { name, description, price, imgUrl, CategoryId } = req.body;
        await Menu.update({ name, description, price, imgUrl, CategoryId }, { where: { id } }, { transaction: t });
        return menu;
      });
      res.json({ message: "Menu successfully updated" });
    } catch (error) {
      next(error);
    }
  }
  static async deleteMenu(req, res, next) {
    try {
      const result = await sequelize.transaction(async (t) => {
        const { id } = req.params;
        const menu = await Menu.findByPk(id, { transaction: t });
        if (!menu) {
          throw { name: "Menu not found" };
        }
        await Menu.destroy({ where: { id } }, { transaction: t });
        return menu;
      });
      res.json({ message: "Menu successfully deleted!" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MenuController;
