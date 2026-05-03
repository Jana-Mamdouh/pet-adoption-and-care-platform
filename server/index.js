const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const petRoutes = require("./routes/petRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
    res.json({ message: "Server is working" });
});
// MongoDB Connection
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
// Routes
app.use("/api/pets", petRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("API is running");
});

// Server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});