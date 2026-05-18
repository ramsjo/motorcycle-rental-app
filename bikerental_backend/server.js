require("dotenv").config();

console.log("MONGO URI:", process.env.MONGO_URI);


const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const bikes = require("./data/bikes");

const Booking = require("./models/Booking");
const Contact = require("./models/Contact");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.get("/api/bikes", (req, res) => {
  res.json(bikes);
});

/* --------------------------------
   MongoDB Connection
-------------------------------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

/* --------------------------------
   Home Route
-------------------------------- */
app.get("/", (req, res) => {
  res.send("Motorcycle Rental API is running.");
});

/* --------------------------------
   Get all bookings
-------------------------------- */
app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find();

    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      error: "Server error",
    });
  }
});

/* --------------------------------
   Get bookings for a specific bike
-------------------------------- */
app.get("/api/bookings/:bike", async (req, res) => {
  try {
    const bikeBookings = await Booking.find({
      bike: req.params.bike,
    });

    res.json(bikeBookings);
  } catch (error) {
    res.status(500).json({
      error: "Server error",
    });
  }
});

/* --------------------------------
   Create booking
-------------------------------- */
app.post("/api/bookings", async (req, res) => {
  try {
    const { name, fromDate, toDate, bike } =
      req.body;

    // Validation
    if (!name || !fromDate || !toDate || !bike) {
      return res.status(400).json({
        error: "Missing booking fields",
      });
    }

    // Get existing bookings
    const existingBookings = await Booking.find({
      bike,
    });

    // Check overlap
    const isBooked = existingBookings.some(
      (booking) => {
        return (
          new Date(fromDate) <=
            new Date(booking.toDate) &&
          new Date(toDate) >=
            new Date(booking.fromDate)
        );
      }
    );

    if (isBooked) {
      return res.status(400).json({
        error:
          "Bike already booked for selected dates",
      });
    }

    // Save booking
    const booking = new Booking({
      name,
      fromDate,
      toDate,
      bike,
    });

    await booking.save();

    res.status(201).json({
      message: "Booking confirmed!",
      booking,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server error",
    });
  }
});

/* -----------------------------
   Contact Route
----------------------------- */
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    // Save message
    const contact = new Contact({
      name,
      email,
      message,
    });

    await contact.save();

    res.status(201).json({
      message:
        "Message received successfully!",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server error",
    });
  }
});

/* --------------------------------
   Start server
-------------------------------- */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});