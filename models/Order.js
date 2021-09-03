const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderSchema = new Schema({
  created_on: {
    type: Date,
    default: Date.now(),
  },
  ship_date: {
    type: Number,
  },
  tracking_number: {
    type: Number,
    unique: true,
    required: true,
  },
  shipping_carrier: {
    type: String,
  },
  shipping_method: {
    type: String,
  },
  tracking_url: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
