/*
 * Dictionnary MODEL
 */

var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
let shortid= require("shortid");
let Schema = mongoose.Schema;

//Describe the schema (model)
var DictionnarySchema = mongoose.Schema({
  id: { type: String, require: true },
  label: { type: String, unique: true },
  definition: String
});

var Dictionnary = mongoose.model("Dictionnary", DictionnarySchema);


module.exports = Dictionnary;
