import mongoose from 'mongoose';
import Contact from '../models/Contact.js';

export default async function handler(req, res) {
  // Only allow POST requests for the contact form
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { name, email, message } = req.body;

  // Simple validation
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  try {
    // Check if we have a connection to the database or if it's currently
    // connecting or disconnecting (readyState 1 = connected, 2 = connecting)
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }

    // Save the contact message using Mongoose
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    return res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error connecting to MongoDB or saving data:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error. Please try again later.' });
  }
}
