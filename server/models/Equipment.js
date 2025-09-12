import mongoose from "mongoose";

const equipmentSchema = mongoose.Schema({
  name: String,
  imageUrl: String,
});

const Equipment = mongoose.model("Equipment", equipmentSchema);
export default Equipment;
