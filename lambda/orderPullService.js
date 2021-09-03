const axios = require("axios");
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

exports.handler = async (event) => {
  const orderPull = async () => {
    return await axios.get(
      "https://automation.bigdaddyunlimited.com/tracking_data.json"
    );
  };

  mongoose.connect(process.env.MONGOD_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const orderResponse = await orderPull();

  const newOrders = [];
  for (let order of orderResponse.data) {
    const {
      ship_date,
      tracking_number,
      shipping_carrier,
      shipping_method,
      tracking_url,
    } = order;
    try {
      const newOrder = await Order.create({
        ship_date,
        tracking_number,
        shipping_carrier,
        shipping_method,
        tracking_url,
      });
      newOrders.push(newOrder);
    } catch (error) {
      if (error.code == 11000) console.log("duplicate");
    }
  }
  mongoose.disconnect();

  const response = {
    statusCode: 200,
    data: {
      newOrders,
    },
  };
  return response;
};
