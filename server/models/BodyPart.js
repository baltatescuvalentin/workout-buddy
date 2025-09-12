import mongoose from "mongoose";

const bodyPartSchema = mongoose.Schema({
  name: String,
  imageUrl: String,
});

const BodyPart = mongoose.model("BodyPart", bodyPartSchema);
export default BodyPart;
