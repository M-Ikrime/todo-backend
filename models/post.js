const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

const Post = mongoose.model("post", postSchema);

module.exports = Post;
