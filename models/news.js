import { Schema, model, models } from "mongoose";

const NewsSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: [true, "Title is required."],
  },
  content: {
    type: String,
    required: [true, "Content is required."],
  },
  imageUrl: {
    type: String,
    required: [true, "Image is required"],
  },
  tag: {
    type: String,
    required: [true, "Tag is required."],
  },
});

const News = models.News || model("News", NewsSchema);

export default News;
