import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { Server } from "mongodb";

const connectionsString = "mongodb://localhost:27017/fluffy-kitten";
mongoose.connect(connectionsString);

const server = express();

server.use(bodyParser.json());

const kittySchema = { name: String, flur: String, lives: Number };
const Cat = mongoose.model("KittyCat", kittySchema);

server.get("/", (request, response) => {
  response.json({ status: "Server is up and running" });
});

server.get("/cats", (request, response) => {
  Cat.find().then((cats) => response.json(cats));
});

server.post("/cats", (request, response) => {
  const kitty = new Cat({
    name: request.body.name,
    flur: request.body.flur,
    lives: request.body.lives,
  });

  kitty
    .save()
    .then((kitty) => response.json(`${kitty.name} says meow.`))
    .catch((error) => response.json(error));
});

server.listen(5000);
