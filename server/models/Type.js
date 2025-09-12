import mongoose from "mongoose";

const typeSchema = mongoose.Schema({
  name: String,
  imageUrl: String,
});

const Type = mongoose.model("Type", typeSchema);
export default Type;
