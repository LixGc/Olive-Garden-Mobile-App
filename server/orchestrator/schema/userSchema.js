const Redis = require("ioredis");
const axios = require("axios");
const redis = new Redis({
  port: 15470,
  host: "redis-15470.c252.ap-southeast-1-1.ec2.cloud.redislabs.com",
  password: process.env.REDIS_PASSWORD,
});

const userAxios = axios.create({
  baseURL: process.env.USER_SERVICE_URL + "/users" || "http://localhost:4001/users",
});

const typeDefs = `#graphql

 
  type MongoUser {
    _id: ID
    username: String
    email: String
    phoneNumber: Int
    role: String
    address: String
  }

  type Message {
    message: String
  }

  input UserInput {
    username: String
    email: String
    password: String
    phoneNumber: String
    address: String
  }

  type Query {
    getUsers: [MongoUser]
    getUserById(id: ID!): MongoUser
  }

  type Mutation {
    addUser(user: UserInput): Message
    deleteUser(id: ID!): Message
  }
`;
const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        let users = await redis.get("users");
        if (!users) {
          const { data } = await userAxios("/");
          users = data;
        }
        return users;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    getUserById: async (_, args) => {
      try {
        console.log(args.id, "tessss");
        let user = await redis.get("user:" + args.id);
        if (!user) {
          const { data } = await userAxios("/" + args.id);
          user = data;
        }
        return user;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  Mutation: {
    addUser: async (_, args) => {
      try {
        const { username, email, password, phoneNumber, address } = args.user;
        const { data } = await userAxios.post("/", { username, email, password, phoneNumber, address });
        await redis.del("users");
        return { message: data.message };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    deleteUser: async (_, args) => {
      try {
        const { data } = await userAxios.delete("/" + args.id);
        await redis.del("user:" + args.id);
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
