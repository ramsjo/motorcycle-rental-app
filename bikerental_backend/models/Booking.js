const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  bike: {
    type: String,
    required: true,
  },

  fromDate: {
    type: String,
    required: true,
  },

  toDate: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  "Booking",
  bookingSchema
);