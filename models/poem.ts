import { Schema, model, models } from "mongoose";

const CommentSchema = new Schema({
  text: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const PoemSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    readingTime: {
      type: Number,
      required: [true, "Reading time is required"],
    },
    author: {
      type: String,
      default: "Jadirh González",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    comments: {
      type: [CommentSchema],
      default: [],
    },
    likes: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Poem = models.Poem || model("Poem", PoemSchema);
export default Poem;
