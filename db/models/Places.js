import mongoose from "mongoose";
const { Schema } = mongoose;
const placeSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  location: { type: String, required: true },
  mapUrl: { type: String, required: true },
  description: { type: String, required: true },
});

const Place = mongoose.models.Place || mongoose.model("Place", placeSchema); //compiling

export default Place;
