const { ObjectId } = require("mongodb");
const { getDb } = require("../config/mongo");

class User {
  static collection() {
    return getDb().collection("users");
  }

  static async findAll() {
    try {
      const users = await this.collection()
        .find({}, { projection: { password: 0 } })
        .toArray();
      return users;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  static async findByEmail(email) {
    try {
      const users = await this.collection().findOne({ email: email }, { projection: { password: 0 } });
      return users;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  static async findByPk(id) {
    try {
      const users = await this.collection().findOne({ _id: new ObjectId(id) }, { projection: { password: 0 } });
      return users;
    } catch (error) {
      throw error;
    }
  }
  static async create({ username, email, password, phoneNumber, role, address }) {
    try {
      const users = await this.collection().insertOne({ username, email, password, phoneNumber, role, address });
      return users;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  static async destroy(id) {
    try {
      const users = await this.collection().deleteOne({ _id: new ObjectId(id) });
      return users;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = User;
