import Mongoose from "mongoose";
import User from "./User.js";
const paperSchema = new Mongoose.Schema({
  user: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  paperName: String,
  imf: Number,
  authorType: String,
  file_data: {},
  date: {
    type: Date,
    default: Date.now(),
  },
});
const paper = Mongoose.model("paper", paperSchema);

export default paper;
