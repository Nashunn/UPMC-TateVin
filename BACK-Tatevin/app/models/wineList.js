
/*
 * WineList MODEL
 */

var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
let shortid= require("shortid");
let Schema = mongoose.Schema;

//Describe the schema (model)
var WineListSchema = mongoose.Schema({
  id: {type: String, require: true, default: shortid.generate()},
  wines: [{ type: Schema.Types.ObjectId, ref:"Wine" }]
});

var WineList = mongoose.model("WineList", WineListSchema);


module.exports = WineList;
