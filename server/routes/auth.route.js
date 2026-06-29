import express from "express";
import { register } from "node:module";
import { loginUser, logout, registerUser, getProfile, createPost, getAllPosts, likePost } from "../controllers/auth.controller.js";
import { upload } from "../middleware/multer.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logout)
router.get('/profile/:id', getProfile);
router.post('/create', upload.single("image"), createPost);
router.get('/all', getAllPosts);
router.post("/like/:id", isAuthenticated, likePost);

export default router;