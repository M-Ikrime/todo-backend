const Post = require("../models/post");
const mongoose = require("mongoose");

module.exports = {
  get: async (req, res) => {
    /** 
    const allPosts = [
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "users",
        },
      },
      {
        $unwind: "$users",
      },
    ];*/

    /**
     
      camelCase
      kebap_case
      UpperCase
    */

    try {
      const id = req.user.id;
      const getAllPosts = await Post.find({ user_id: id }).populate("user_id");
      res.json(getAllPosts);
    } catch (err) {
      console.log(err);
    }
  },
  getId: async (req, res) => {
    try {
      const { id } = req.params;
      const post = await Post.findById(id);
      if (!post) return;
      res.status(200).json(post);
    } catch (err) {
      console.log(err);
    }
  },
  post: async (req, res) => {
    try {
      const post = { ...req.body, user_id: req.user.id };

      const createdPost = await Post.create(post);
      res.status(201).json(createdPost);
    } catch (err) {
      console.log(err);
    }
  },
  put: async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
      const { title, content, creator } = req.body;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("post bulunamadı");
      }
      const updatePost = { title, content, creator, _id: id };
      await Post.findByIdAndUpdate(id, updatePost, { new: true });
      res.json(updatePost);
    } catch (err) {
      console.log(err);
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await Post.findByIdAndRemove(id);
      res.json({ message: "mesaj ortadan kaldırıldı" });
    } catch (err) {
      console.log(err);
    }
  },
};
