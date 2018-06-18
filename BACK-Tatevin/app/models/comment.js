

/*
 * Comment MODEL
 */

var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
let shortid= require("shortid");
let Schema = mongoose.Schema;

//Describe the schema (model)
var CommentSchema = mongoose.Schema({
  id: { type: String, require: true },
  message: String,
  like: { type: Number, default: 0 },
  author: { type: Schema.Types.ObjectId, ref:"User" },
  date: { type: Date, default: Date.now },
  is_signaled: Boolean
});

var Comment = mongoose.model("Comment", CommentSchema);


module.exports = Comment;
