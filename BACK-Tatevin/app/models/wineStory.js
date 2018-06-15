/*
 * USER MODEL
 */

var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

//Describe the schema (model)
var wineStorySchema = mongoose.Schema({
  id: { type: String, require: true },
  author: {type: ObjectId, ref:'User'},
  date: Date.now,
  title: String,
  text: String,
  image: String,
  wine : [{type: ObjectId, ref: 'Wine'}],
  tags: [{type:ObjectId, ref: "Tag"}],
  comments: [{type:ObjectId, ref: "Comment"}],
});

var WineStory = mongoose.model("WineStory", wineStorySchema);


module.exports = WineStory;
