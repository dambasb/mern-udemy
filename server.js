import express from "express";
import mongoose from "mongoose";
import db from "./db.js";
import usersRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import postsRoute from "./routes/posts.js";
import profileRoute from "./routes/profile.js";

const app = express();

// Init Middleware
app.use(express.json());

// Define Routes
app.use("/api/users", usersRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postsRoute);
app.use("/api/profile", profileRoute);

const PORT = process.env.PORT || 5000;

// Connect Database
await mongoose
  .connect(db.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
