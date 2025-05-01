/* eslint-disable no-undef */
// Import dependencies
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

// Your routes (e.g., userRoutes, courseRoutes, etc.)
const userRoutes = require("./routes/User");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payments");
const profileRoutes = require("./routes/Profile");
const contactUsRoute = require("./routes/Contact");

// Database connection, cloudinary setup, dotenv configuration, etc.
const { dbConnect } = require("./configs/database");
const { cloudinaryConnect } = require("./configs/cloudinary");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

// Middleware setup
dbConnect();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Local development frontend
      "https://snfs-fe.vercel.app", // Production frontend on Vercel
    ],
    credentials: true, // Allow cookies to be sent with requests
  })
);

// Other middleware
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Cloudinary setup
cloudinaryConnect();

// Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

// Test route to verify if the server is up
app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Server is running...",
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
