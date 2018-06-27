

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
  like: { type: Object, default: {score:0, maxScore:5, vote:0 } },
  author: { type: Schema.Types.ObjectId, ref:"User" },
  date: { type: Date, default: Date.now },
  is_signaled: {type:Boolean, default:false}
});

var Comment = mongoose.model("Comment", CommentSchema);


module.exports = Comment;
