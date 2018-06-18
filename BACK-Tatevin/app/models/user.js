/*
 * USER MODEL
 */

let mongoose = require("mongoose");
let bcrypt = require("bcryptjs");
let shortid = require("shortid");
let Schema = mongoose.Schema;

//Describe the schema (model)
let userSchema = mongoose.Schema({
  id: {type: String, require: true, default: shortid.generate()},
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  },
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  birthday: {
    type: Date,
    default: Date.now
  },
  password: {
    type: String
  },
  avatar: {type: String},
  subscription: [{type: Schema.Types.ObjectId, ref: "User"}],
  description: String,
  is_admin: Boolean,
  cave: {type: Schema.Types.ObjectId, ref: "WineList"},
  wishlist: {type: Schema.Types.ObjectId, ref: "WineList"}
});

let User = mongoose.model("User", userSchema);

//not used
userSchema.methods.comparePassword = function(pass, cb) {
    bcrypt.compare(pass, user.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = User;
