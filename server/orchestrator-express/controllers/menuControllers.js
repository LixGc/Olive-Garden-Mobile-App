const Redis = require("ioredis");
const axios = require("axios");
const redis = new Redis({
  port: 15470,
  host: "redis-15470.c252.ap-southeast-1-1.ec2.cloud.redislabs.com",
  password: process.env.REDIS_PASSWORD,
});

const menuAxios = axios.create({
  baseURL: "http://localhost:4002/menus",
});

class MenuController {
  static async findAllMenu(req, res, next) {
    try {
      let menus = await redis.get("menus");
      if (!menus) {
        const { data } = await axios.get("http://localhost:4002/menus");
        menus = data;
      }
      res.json(menus);
    } catch (error) {
      next(error);
    }
  }
  static async findMenuById(req, res, next) {
    try {
      const { id } = req.params;
      let product = await redis.get(`product:${id}`);
      if (!product) {
        const { data } = await menuAxios("/" + id);
        const { data: data2 } = await axios.get("http://localhost:4001/users/" + data.mongoUserId);
        const result = {
          name: data.name,
          description: data.description,
          price: data.price,
          imgUrl: data.imgUrl,
          CategoryId: data.CategoryId,
          Category: data.Category,
          Ingredients: data.Ingredients,
          MongoUser: data2,
        };
        product = result;
      }
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
  static async addMenu(req, res, next) {
    try {
      await menuAxios.post("/", req.body);
      await redis.del("products");
      res.status(201).json({ message: "Menu successfully created!" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async editMenu(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description, price, imgUrl, CategoryId } = req.body;
      await menuAxios.put("/" + id, { name, description, price, imgUrl, CategoryId });
      await redis.del("products");
      await redis.del("product:" + id);
      res.json({ message: "Menu successfully updated" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async deleteMenu(req, res, next) {
    try {
      const { id } = req.params;
      await menuAxios.delete("/" + id);
      await redis.del("products");
      await redis.del("product:" + id);
      res.json({ message: "Menu successfully deleted!" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MenuController;
