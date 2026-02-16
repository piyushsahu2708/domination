require("dotenv").config();
const express = require("express");
const app = express();

const connectDB = require("./config/mongodb");
const indexRoutes = require("./routes/index.routes");
const userRoutes = require("./routes/user.routes");

// Database connect
connectDB();

app.use((req, res, next) => {
  console.log("Request hit:", req.method, req.url);
  next();
});


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", indexRoutes);
app.use("/user", userRoutes);

// Server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
