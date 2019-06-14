// App Middleware Requirements
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const path = require("path"); // Core module so not installed
const passport = require("passport");
const cors = require("cors");
const router = express.Router();  
const port = process.env.PORT || 3000;
const users = require("./Routes/users"); // Importing the user router file
const product = require("./Routes/products"); // Importing the orders router file
const config = require("./config/database"); // Importing the Db In the config folder
// require("./models/userModel");

const app = express();

// APP CONFIG
app.use(cors());
app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json()); // For Json Files
app.use("/users", users); // User Router Configuration
app.use("/products", product); // Order Router Configuration

// Import Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport); // Bring in the passport.js in the config folder

// Connect To database
mongoose.connect(config.database, { useNewUrlParser: true }); // { useNewUrlParser: true } is to remove depreciation Warning

// Message On if Successfully Connected to Db
mongoose.connection.on("connected", () => {
    console.log("Connected to database " + config.database);
})

// Message On if There is an error in database Connection
mongoose.connection.on("error", (err) => {
    console.log("Database Error: " + err);
})

// To Remove moongoose depreciation warnings
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


//set static folder
// app.use(express.static(path.join( __dirname,'public')));


// Index Route
app.get("/", (req, res) => {
    res.send("Invalid Endpoint");
})


























app.listen(port, () => {
    console.log("Server is listening on Port " + port);
});