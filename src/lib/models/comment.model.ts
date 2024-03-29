import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  beerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Beers",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const CommentModel =
  mongoose.models.Comments || mongoose.model("Comments", CommentSchema);

export default CommentModel;
