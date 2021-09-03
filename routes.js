const axios = require("axios");
const Order = require("./models/Order");

module.exports = (app) => {
  // home route - serves angular application
  app.get("/", (req, res) => {
    res.sendFile("app.html", { root: __dirname + "/public/html" });
  });

  app.get("/orders", async (req, res) => {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    const orderResponse = await Order.find({
      created_on: { $gte: threeDaysAgo },
    });

    res.status(200).json(orderResponse);
  });
};
