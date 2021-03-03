import express from "express";
import mongodb from "mongodb";
import bodyParser from "body-parser";

const connectionsString = "mongodb://localhost:27017/";

const databaseName = "fluffy-kitten";

const mongoClient = mongodb.MongoClient;

mongoClient.connect(connectionsString, (error, client) => {
  const db = client.db(databaseName);
  const kittyCats = db.collection("kittyCats").find().toArray();
});

const server = express();

server.use(bodyParser.json());

server.get("/", (request, response) => {
  response.json({ status: "Server is up and running." });
});

server.get("/cats", (request, response) => {
  mongoClient.connect(connectionsString, async (error, client) => {
    const db = client.db(databaseName);
    const kittyCats = await db.collection("kittyCats").find().toArray;
    response.json(kittyCats);
  });
});

server.post("/cats", (request, response) => {
  const cat = {
    name: request.body.name,
    flur: request.body.flur,
    lives: request.body.lives,
  };
  mongoClient.connect(connectionsString, (error, client) => {
    const db = client.db(databaseName);
    db.collection("kittyCats")
      .insertOne(cat)
      .then((result) => response.json(result.ops[0]));
  });
});

server.listen(3000);
