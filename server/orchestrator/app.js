if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { typeDefs: menuTypeDefs, resolvers: menuResolvers } = require("./schema/menuSchema");
const { typeDefs: userTypeDefs, resolvers: userResolvers } = require("./schema/userSchema");

const server = new ApolloServer({
  typeDefs: [menuTypeDefs, userTypeDefs],
  resolvers: [menuResolvers, userResolvers],
});

startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000 },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
