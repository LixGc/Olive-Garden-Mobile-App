require("dotenv").config();
const Redis = require("ioredis");
const axios = require("axios");
const redis = new Redis({
  port: 15470,
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
});
const menuAxios = axios.create({
  baseURL: process.env.APP_SERVICE_URL + "/menus" || "http://localhost:4002/menus",
});

const typeDefs = `#graphql

  type Category {
    id: Int
    name: String
    createdAt: String
    updatedAt: String
  }

  type Ingredients {
    id: ID
    MenuId: ID
    name: String
    createdAt: String
    updatedAt: String
  }
  type MongoUser {
    _id: ID
    username: String
    email: String
    phoneNumber: Int
    role: String
    address: String
  }

  type Menu {
    id: ID
    name: String
    description: String
    price: Int
    imgUrl: String
    mongoUserId: ID
    CategoryId: Int
    createdAt: String
    updatedAt: String
    Category: Category
    Ingredients: [Ingredients]
  }

  type MenuById {
    id: ID
    name: String
    description: String
    price: Int
    imgUrl: String
    mongoUserId: ID
    CategoryId: Int
    createdAt: String
    updatedAt: String
    Category: Category
    Ingredients: [Ingredients]
    mongoUser: MongoUser
  }

  type Message {
    message: String
  }

  input MenuInput {
    name:String!
    description:String!
    price:Int!
    imgUrl:String!
    CategoryId: ID!
    mongoUserId: ID!
    ingredientName: String!
  }


  type Query {
    getMenus: [Menu]
    getMenuById(id: ID!): MenuById
  }

  type Mutation {
    addMenu(menu: MenuInput): Message
    editMenu(menu: MenuInput, id: Int!): Message
    deleteMenu(id: ID!): Message
  }
`;
const resolvers = {
  Query: {
    getMenus: async () => {
      try {
        let product = await redis.get("product");
        if (!product) {
          const { data } = await menuAxios.get("/");
          product = data;
        }
        return product;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    getMenuById: async (_, args) => {
      try {
        let product = await redis.get(`product:${args.id}`);
        if (!product) {
          const { data } = await menuAxios.get("/" + args.id);
          const { data: data2 } = await axios.get(
            process.env.USER_SERVICE_URL + "/users/" + data.mongoUserId || "http://localhost:4001/users/" + data.mongoUserId
          );
          const result = {
            id: data.id,
            name: data.name,
            description: data.description,
            price: data.price,
            imgUrl: data.imgUrl,
            CategoryId: data.CategoryId,
            Category: data.Category,
            Ingredients: data.Ingredients,
            mongoUser: data2,
            mongoUserId: data.mongoUserId,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          };
          product = result;
        }
        return product;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  Mutation: {
    addMenu: async (_, args) => {
      try {
        const { name, description, price, imgUrl, CategoryId, ingredientName, mongoUserId } = args.menu;
        console.log(name, description, price, imgUrl, CategoryId, ingredientName, mongoUserId);
        const { data } = await menuAxios.post("/", { name, description, price, imgUrl, CategoryId, ingredientName, mongoUserId });
        await redis.del("products");
        return { message: data.message };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    editMenu: async (_, args) => {
      try {
        const { name, description, price, imgUrl, CategoryId, ingredientName, mongoUserId } = args.menu;
        console.log(name, description, price, imgUrl, CategoryId, ingredientName, mongoUserId, (id = args.id));
        const { data } = await menuAxios.put("/" + id, { name, description, price, imgUrl, CategoryId, ingredientName, mongoUserId });
        await redis.del("products");
        await redis.del("product:" + args.id);
        return { message: data.message };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    deleteMenu: async (_, args) => {
      try {
        const { data } = await menuAxios.delete("/" + args.id);
        await redis.del("products");
        await redis.del("product:" + args.id);
        return { message: data.message };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
module.exports = {
  typeDefs,
  resolvers,
};
