import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import Cat from "./models/cat.model.js";

const connectionsString =
  "mongodb+srv://Emmanuellosch:6Niz6Xe4b36hnw0g@cluster0.zsgip.mongodb.net/fluffy-kitten?retryWrites=true&w=majority";
mongoose.connect(connectionsString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const server = express();

server.use(bodyParser.json());

server.get("/", (request, response) => {
  response.json({ status: "Server is up and running" });
});

server.get("/cats", (request, response) => {
  Cat.find().then((cats) => response.json(cats));
});

server.get("/cats/:catId", (request, response) => {
  const catId = request.params.catId;

  Cat.findById(catId).then((cat) => response.json(cat));
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

server.put("/cats/:catId", (request, response) => {
  const catId = request.params.catId;
  const updatedCat = request.body;

  Cat.findOneAndUpdate({ _id: catId }, updatedCat, {
    new: true,
  }).then((result) => response.json(result));
});

server.delete("/cats/:catId", (request, response) => {
  const catId = request.params.catId;
  Cat.findByIdAndDelete(catId).then((cats) => response.json(cats));
});

server.listen(4000);
