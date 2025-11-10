const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// Student Schema
const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  dob: String,
  gender: String,
  course: String,
  address: String,
  password: { type: String, required: true },
});

const Student = mongoose.model("Student", studentSchema);

// Register endpoint
app.post("/register", async (req, res) => {
  console.log("Received data:", req.body);
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.json({ message: "🎉 Registration successful!" });
  } catch (err) {
    console.error("Error saving student:", err);
    res.status(500).json({ message: "❌ Error saving data" });
  }
});

// Serve index.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

