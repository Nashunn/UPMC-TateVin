/*
 * Producer MODEL
 */

var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
let shortid= require("shortid");
let Schema = mongoose.Schema;

//Describe the schema (model)
var ProducerSchema = mongoose.Schema({
  id: {type: String, require: true},
  num_siret: { type: String, unique: true, required: true },
  website: String,
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  },
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: String,
  phone: String,
  address: String,
  description: String,
});

var Producer = mongoose.model("Producer", ProducerSchema);


module.exports = Producer;
