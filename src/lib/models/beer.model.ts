import mongoose from "mongoose";

const BeerSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  abv: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  tagline: {
    type: String,
    required: true,
  },
  first_brewed: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  food_pairing: {
    type: [String],
    required: true,
  },
  brewers_tips: {
    type: String,
    required: true,
  },
  contributed_by: {
    type: String,
    required: true,
  },
  averageRating: {
    type: Number,
    required: false,
  },
});

const BeerModel = mongoose.models.Beers || mongoose.model("Beers", BeerSchema);

export default BeerModel;
