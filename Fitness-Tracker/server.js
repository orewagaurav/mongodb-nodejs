const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB with better error handling
mongoose.connect("mongodb://localhost:27017/main")
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => {
        console.error("❌ Could not connect to MongoDB:", err.message);
        console.log("Please make sure MongoDB is running on your system");
    });

// Define User Schema with proper validation
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    id: {
        type: Number,
        required: true
    },
    days: {
        type: Object,
        required: true,
        default: {}
    }
}, { collection: "users" });

const User = mongoose.model("User", userSchema);

// API to fetch fitness data
app.get("/fitness-data", async (req, res) => {
    const { name, day } = req.query;

    if (!name || !day) {
        return res.status(400).json({ message: "Name and day are required" });
    }

    try {
        const user = await User.findOne({ name: name.trim() });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const dayData = user.days[day];
        if (!dayData) {
            return res.status(404).json({ message: "No fitness data found for this day" });
        }

        res.json(dayData);
    } catch (error) {
        console.error("Error fetching fitness data:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Health check endpoint
app.get("/health", (req, res) => {
    res.json({ status: "ok", mongodb: mongoose.connection.readyState === 1 });
});

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});