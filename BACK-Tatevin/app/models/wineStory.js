/*
 * WS MODEL
 */

var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

let Schema = mongoose.Schema;

//Describe the schema (model)
var wineStorySchema = mongoose.Schema({
  id: { type: String, unique: true},
  author: {type: Schema.Types.String, ref:'User'},
  date: {type:Date, default:Date.now},
  title: String,
  text: String,
  image: String,
  wines : [{type: Schema.Types.String, ref: 'Wine'}],
  tags: [{type:Schema.Types.String, ref: "Tag"}],
  comments: [{type:Schema.Types.ObjectId, ref: "Comment"}]
});

var WineStory = mongoose.model("WineStory", wineStorySchema);


module.exports = WineStory;
