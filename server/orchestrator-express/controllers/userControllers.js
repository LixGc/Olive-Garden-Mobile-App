const Redis = require("ioredis");
const axios = require("axios");
const redis = new Redis({
  port: 15470,
  host: "redis-15470.c252.ap-southeast-1-1.ec2.cloud.redislabs.com",
  password: process.env.REDIS_PASSWORD,
});

const userAxios = axios.create({
  baseURL: "http://localhost:4001/users",
});
class UserController {
  static async findAll(req, res, next) {
    try {
      let users = await redis.get("users");
      if (!users) {
        const { data } = await userAxios("/");
        users = data;
      }
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
  static async findByPk(req, res, next) {
    try {
      const { id } = req.params;
      let user = await redis.get("user:" + id);
      if (!user) {
        const { data } = await userAxios("/" + id);
        user = data;
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      const { data } = await userAxios.post("/", { username, email, password, phoneNumber, address });
      await redis.del("users");
      res.status(201).json({ message: data });
    } catch (error) {
      next(error);
    }
  }
  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const { data } = await userAxios.delete("/" + id);
      await redis.del("users");
      await redis.del("user/" + id);
      res.status(201).json({ message: data });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
