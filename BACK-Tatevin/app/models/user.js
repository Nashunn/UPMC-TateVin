/* 
 * USER MODEL 
 */

var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

//Describe the schema (model)
var userSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  },
  username: {
    type: String,
    trim: true
  },
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  userStatus: {
    type: Boolean
  },
  password: {
    type: String
  },
  passwordConf: {
    type: String
  },
  authorOfCards: [Number],
  authorOfBooks: [Number],
  avatar: {type:String}

});

var User = mongoose.model("User", userSchema);

//not used
userSchema.methods.comparePassword = function(pass, cb) {
    bcrypt.compare(pass, user.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = User;
