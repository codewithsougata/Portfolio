import mongoose from "mongoose";
import Contact from "../models/Contact.js";

const MONGODB_URI = process.env.MONGODB_URI;

async function connectDB() {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(MONGODB_URI);
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await connectDB();

      const { name, email, message } = req.body;

      const newContact = new Contact({
        name,
        email,
        message
      });

      await newContact.save();

      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}