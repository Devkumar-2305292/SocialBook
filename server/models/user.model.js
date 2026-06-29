// import { unique } from "lodash";
import mongoose from "mongoose";
import { type } from "node:os";

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, default: null },
    dateofbirth: { type: String, default: null },
    profilePicture: { type: String, default: null },
    coverPhoto: { type: String, default: null },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    sentRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    bio: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bio" }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "posts" }],
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
