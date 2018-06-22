/*
 * Wine MODEL
 */

var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
let Schema = mongoose.Schema;

//Describe the schema (model)
var WineSchema = mongoose.Schema({
    id: {type: String, require: true},
    date: {type: Date, default: Date.now},
    name: String,
    terroir: String,
    type: String,
    classification: String,
    gaz: Boolean,
    grape: [{type: String}],
    keep_in_cave: Boolean,
    tasting_date: Date,
    decantation: Number, //Carrafage
    millesime: Number, //Millesime
    comments: [{type: Schema.Types.ObjectId, ref: "Comment"}]
});

var Wine = mongoose.model("Wine", WineSchema);


module.exports = Wine;
