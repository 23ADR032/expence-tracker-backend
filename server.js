import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// MongoDB connection string from environment variables
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/expense-tracker";

const app = express();
app.use(cors());
app.use(express.json());

// Mongoose model
const transactionSchema = new mongoose.Schema({
  title: String,
  amount: Number,
});
const Transaction = mongoose.model("Transaction", transactionSchema);

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    console.log("Please check:");
    console.log("1. Your MongoDB Atlas IP whitelist settings");
    console.log("2. Your internet connection");
    console.log("3. Your MongoDB credentials");
    process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB error:', err);
});

// Connect to database
connectDB();

// Health check route
app.get("/api/health", (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? "connected" : "disconnected";
  res.json({ 
    status: "Server is running", 
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});

// Routes
app.get("/api/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

app.post("/api/transactions", async (req, res) => {
  try {
    const { title, amount } = req.body;
    const transaction = new Transaction({ title, amount });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ error: "Failed to create transaction" });
  }
});

app.delete("/api/transactions/:id", async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ error: "Failed to delete transaction" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));