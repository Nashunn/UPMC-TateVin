/*
 * Opinion MODEL
 */

var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
let Schema = mongoose.Schema;
let Tag = require("./tag"); //??

//Describe the schema (model)
var OpinionSchema = mongoose.Schema({
  id: {type: String, require: true},
  date: { type: Date, default: Date.now },
  id_user: { type: Schema.Types.ObjectId, ref:"User" },
  id_wine: { type: Schema.Types.ObjectId, ref:"Wine" },
  price: Number,
  score: Number,
  smell: [Tag],
  visual: [Tag],
  taste: [Tag],
  moment: [Tag],
  heat: [Tag],
  food: [Tag],


});

var Opinion = mongoose.model("Opinion", OpinionSchema);


module.exports = Opinion;
