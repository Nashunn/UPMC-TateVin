/*
 * VARIABLES
 */
let express = require("express");
let mongoose = require("mongoose");
let morgan = require('morgan');
let bodyParser = require("body-parser");
var path    = require("path");
var router = express.Router();
//Host-variables
let hostname = "localhost";
let port = 3001;

//Using express
const app = express();

//Using morgan to log our erros/http
app.use(morgan('combined'));

let options = {
  server: {socketOptions: {keepAlive: 300000, connectTimeoutMS: 30000}},
  replset: {socketOptions: {keepAlive: 300000, connectTimeoutMS: 30000}}
};

//URL of our MongoDB database
let urlmongo =
  "mongodb://loutre:loutre3@ds125388.mlab.com:25388/tatevin";
//Connecting it
mongoose.connect(urlmongo, options);

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

//CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, x-access-token, Content-Type, authorization, Authorization, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});

//Include routes (ex /home, /users...)
let routes = require("./app/routes/router");

app.use("/", routes);

// Starting the server
app.listen(port, hostname, function () {
  console.log("Le serveur Tatevin est fonctionnel sur http://" + hostname + ":" + port + " ! \n");
});

module.exports = app;
