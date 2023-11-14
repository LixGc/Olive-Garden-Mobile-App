const hashPassword = require("../helpers/bcrypt");
const User = require("../models/user");

class UserController {
  static async findAll(req, res, next) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
  static async findByPk(req, res, next) {
    try {
      const { id } = req.params;
      const users = await User.findByPk(id);
      if (!users) {
        throw { name: "Data not found!" };
      }
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      if (!username || !email || !password || !phoneNumber || !address) {
        throw { name: "not_valid" };
      }
      const user = await User.findByEmail(email);
      if (user) {
        throw { name: "Email already exist!" };
      }
      await User.create({ username, email, password: hashPassword(password), phoneNumber, role: "admin", address });
      return res.status(201).json({ message: "Data successfully created!" });
    } catch (error) {
      next(error);
    }
  }
  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        throw { name: "Data not found!" };
      }
      await User.destroy(id);
      res.json({ message: "Data successfully deleted!" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
