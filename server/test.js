import 'dotenv/config';
import mongoose from 'mongoose';

console.log("URI =", process.env.MONGODB_URI);

await mongoose.connect(process.env.MONGODB_URI);

console.log("Connected");