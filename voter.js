const { MongoClient } = require("mongodb");

// Replace with your MongoDB connection string
const uri = "mongodb://localhost:27017"; // Use your MongoDB Compass connection string if needed

const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("faculty"); // Replace with your database name
    const collection = db.collection("voter_data"); // Replace with your collection name

    // Example: Insert a document
    await collection.insertOne({ name: "OrewaGaurav", age: 20 });
    console.log("Document inserted!");

  } catch (error) {
    console.error("Connection failed", error);
  } finally {
    await client.close();
  }
}

connectDB();
