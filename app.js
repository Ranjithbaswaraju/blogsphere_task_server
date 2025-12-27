const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const { connectDB } = require("./confige/db.js");
const authRoutes = require("./routes/authRoutes.js");
const postRoutes = require("./routes/postRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const commentRoutes = require("./routes/commentRoutes.js");
const likeRouter = require("./routes/likeRoutes.js");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      "https://blogsphere-task-client.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

// DB Connection
connectDB();

// Routes
app.use("/auth", authRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);
app.use("/likePost", likeRouter);
app.use("/", userRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
