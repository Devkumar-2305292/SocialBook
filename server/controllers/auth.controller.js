import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Post from "../models/post.model.js";
import cloudinary from "../utils/cloudinary.js";

export const registerUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password, gender, dateofBirth } =
      req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User with this email already exists",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      gender,
      dateofBirth,
    });

    await newUser.save();
    return res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//LoginUser:

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check the existing user with this email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found with this email",
      });
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(404).json({
        message: "Invalid Password",
        success: false,
      });
    }

    const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        success: true,
        message: `Welcome back ${user.firstname}`,
        user: {
          _id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          gender: user.gender,
          dateofBirth: user.dateofBirth,
          // password is intentionally excluded
        },
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const logout = async(__, res)=>{
  try{
    return res.status(200).cookie("token", "", {maxAge:0}).json({
        message:"Logged out successfully",
        success:true
    })
  } catch( error ) {
    console.log(error);
  }
}

export const getProfile = async(req, res) => {
  try{
      const {id} = req.params;

      const user = await User.findById(id).select("-password").populate("friends", "firstname lastname profilePicture").populate("following", "firstname lastname profilePicture");

      if(!user){
        return res.status(404).json({success: false, message: "User not found",});
      }

      return res.status(200).json({success: true, user,})
  }catch(error){
    console.log("Get Profile Error:", error);

    return res.status(500).json({success: false,
      message: "Internal Server Error",
    });
  }
};

export const createPost = async (req, res) => {
  try{
    console.log(req.file);
    const {caption} = req.body;
    const result = await cloudinary.uploader.upload(req.file.path);
    

    const post = await Post.create({
      caption,
      image: result.secure_url,
      author: req.id,
    });

    return res.status(201).json({
      success: true,
      post,
    });
  } catch(error){
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create post",
    });
  }
};

export const getAllPosts = async (req, res) => {
  try{
    const posts = await Post.find().populate("author", "firstname lastname").sort({ createAt: -1 });

    return res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success:false,
      message: "failed to fetch posts",
    });
  }
};

export const likePost = async (req, res) => {
  try{
    const post = await Post.findById(req.params.id);

    if(!post){
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const alreadyLiked = post.likes.includes(req.id);

    if(alreadyLiked){
      post.likes.pull(req.id);
    }else{
      post.likes.push(req.id);
    }

    await post.save();

    return res.status(200).json({
      success: true,
      likes: post.likes.length,
      liked: !alreadyLiked,
    });
  } catch (error) {
    console.log(error);
  }
};