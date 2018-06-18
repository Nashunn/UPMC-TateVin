
/*
 * Learning MODEL
 */

var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
let shortid= require("shortid");
let Schema = mongoose.Schema;

//Describe the schema (model)
var LearningSchema = mongoose.Schema({
  id: { type: String, require: true },
  parent: { type: ObjectId, ref:"Learning", default: 0 },
  rank: Integer,
  title: String,
  tags: [Tag],
  sections: [{
    titre: String,
    texte: String,
    img: String
  }]


});

var Learning = mongoose.model("Learning", LearningSchema);


module.exports = Learning;
