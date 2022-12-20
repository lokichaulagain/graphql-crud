import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./typeDefs.js";
import { resolvers } from "./resolvers.js";

const startServer = async () => {
  const app = express();
  const apolloServer = new ApolloServer({ typeDefs, resolvers });
  await apolloServer.start();
  //   apolloServer.applyMiddleware({ app: app });
  apolloServer.applyMiddleware({ app: app, path: "/loki" });
  app.use((req, res) => {
    res.send("Hello from express apollo server");
  });

  //DbConnection
  await mongoose
    .connect(process.env.MONGO_DB_URI, {
      autoIndex: true,
    })
    .then(() => {
      console.log("MongoDb connected successfully...");
    })
    .catch((error) => {
      console.log("MondoDb Disconnected !!!", error);
    });

  // port listen
  app.listen(4000, () => {
    console.log("Server is running on port 4000");
  });
};
startServer();
