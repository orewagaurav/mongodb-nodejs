const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = "mongodb://localhost:27017"; // Change if using MongoDB Atlas
const client = new MongoClient(uri);

let collection;

async function connectDB() {
    try {
        await client.connect();
        const db = client.db("peopleDB"); // ✅ Your Database Name
        collection = db.collection("people"); // ✅ Your Collection Name
        console.log("✅ MongoDB Connected");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err);
    }
}
connectDB();

// Default Route
app.get("/", (req, res) => {
    res.send("✅ Server is running!");
});

// Search by Name and ID
app.get("/getData", async (req, res) => {
    try {
        const { name, id } = req.query;

        console.log("🔍 Searching for:", { name, id });

        if (!name || !id) {
            return res.status(400).json({ error: "Name and ID are required" });
        }

        // Convert ID to integer if stored as a number
        const user = await collection.findOne({ name: name, id: id });

        console.log("📂 Found user:", user);

        if (!user) {
            return res.status(404).json({ message: "No user found" });
        }

        res.json(user);
    } catch (err) {
        console.error("❌ Error fetching data:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});