const User = require("../models/users");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

module.exports = {
  post: async (req, res) => {
    try {
      const { username, email, job, password } = req.body;
      bcrypt.hash(password, 10).then(async (hash) => {
        const user = new User({
          username,
          email,
          job,
          password: hash,
        });
        console.log("asdf");
        const createdUser = await User.create(user);
        res.status(201).json(createdUser);
      });
    } catch (error) {
      console.log(error);
    }
  },
  get: async (req, res) => {
    const allUser = [
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "user_id",
          as: "allPost",
        },
      },
      {
        $unwind: {
          path: "$allPost",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: {
            _id: "$_id",
            username: "$username",
            email: "$email",
            job: "$job",
            password: "$password",
          },
          posts: {
            $push: "$allPost",
          },
        },
      },
      {
        $project: {
          _id: "$_id._id",
          username: "$_id.username",
          posts: "$posts",
        },
      },
    ];
    try {
      const getAllUsers = await User.aggregate(allUser);
      res.json(getAllUsers);
    } catch (error) {
      res.status(404).json(error);
    }
  },
  getId: async (req, res) => {
    const userPost = [
      {
        $match: {
          _id: mongoose.Types.ObjectId(req.params.user_id),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "user_id",
          as: "allPost",
        },
      },
      {
        $unwind: {
          path: "$allpost",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: {
            _id: "$_id",
            username: "$username",
            email: "$email",
            job: " $job",
            password: "$password",
          },
          posts: {
            $push: "$allPost",
          },
        },
      },
      {
        $project: {
          _id: "$_id._id",
          username: "$_id.username",
          posts: "$posts",
        },
      },
    ];
    try {
      const getUserPosts = await User.aggregate(userPost);
      res.json(getUserPosts);
    } catch (error) {
      res.json(error);
    }
  },
  put: async (req, res) => {
    try {
      const id = req.params.user_id;
      console.log(id);
      const { username, email, job, password } = req.body;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("User is not found");
      }
      const updateUSer = { username, email, job, password, _id: id };
      await User.findByIdAndUpdate(id, updateUSer, { new: true });
      res.json(updateUSer);
    } catch (error) {
      res.json(error);
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.user_id;
      await User.findByIdAndRemove(id);
      res.json({ message: "User is deleted" });
    } catch (error) {
      console.log(error);
    }
  },
};
