/*
 * Tag MODEL
 */

var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
let shortid= require("shortid");
let Schema = mongoose.Schema;

//Describe the schema (model)
var TagSchema = mongoose.Schema({
  id: {type: String, require: true, default: shortid.generate()},
  label: { type: String, unique: true },
  type: String
});

var Tag = mongoose.model("Tag", TagSchema);


module.exports = Tag;
