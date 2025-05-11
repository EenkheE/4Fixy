const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const pictureSpotRoutes = require("./routes/pictureSpots");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/Uploads", express.static(path.join(__dirname, "Uploads")));

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/picture-spots", pictureSpotRoutes);

app.get("/", (req, res) => {
  res.send("Picture Spot Map Backend");
});

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
