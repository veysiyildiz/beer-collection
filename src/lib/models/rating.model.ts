import mongoose from "mongoose";

const RatingSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  beerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Beers",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

const RatingModel =
  mongoose.models.Ratings || mongoose.model("Ratings", RatingSchema);

export default RatingModel;
