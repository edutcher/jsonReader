// require dependencies
let express = require("express");
let bodyParser = require("body-parser");
let logger = require("morgan");
let mongoose = require("mongoose");
let Routes = require("./routes.js");
require("dotenv").config();

// define port (feel free to change this) and express app
let port = process.env.PORT || 3000;
let app = express();

// connect to database (feel free to change the connection info or name of the database)
mongoose.connect(process.env.MONGOD_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// mount middleware
app.use(logger("common"));
app.use(express.json(), express.urlencoded({ extended: true }));
app.use(express.static("public"));

Routes(app);

// listen for connections
app.server = app.listen(port, (err) => {
  if (err) {
    console.log("Error starting server:", err);
  } else {
    console.log("Server started on port:", port);
  }
});
