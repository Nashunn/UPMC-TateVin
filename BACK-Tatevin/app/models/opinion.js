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
  smell: [{ type: Schema.Types.String, ref:"Tag" }],
  visual: [{ type: Schema.Types.ObjectId, ref:"Tag" }],
  taste: [{ type: Schema.Types.ObjectId, ref:"Tag" }],
  moment: [{ type: Schema.Types.ObjectId, ref:"Tag" }],
  heat: [{ type: Schema.Types.ObjectId, ref:"Tag" }],
  food: [{ type: Schema.Types.ObjectId, ref:"Tag" }],
});

var Opinion = mongoose.model("Opinion", OpinionSchema);


module.exports = Opinion;
