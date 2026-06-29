import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/auth.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//default middleware:
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/post", postRoute);


app.listen(PORT, () => {
  console.log(`Server Listen at port ${PORT}`);
  connectDB();
});
