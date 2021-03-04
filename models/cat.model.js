import mongoose from "mongoose";

const kittySchema = { name: String, flur: String, lives: Number };
const Cat = mongoose.model("KittyCat", kittySchema);

export default Cat;
