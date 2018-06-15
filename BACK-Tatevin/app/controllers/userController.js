var User = require("../models/user");
var jwt = require("jsonwebtoken");
var config = require("./../../config/config");
var bcrypt = require("bcryptjs");


exports.findAllUser = function (req, res) {
  User.find(function (err, users) {
    if (err) {
      res.send(err);
    }
    res.json(users);
  });
};


exports.findOneUser = function (req, res) {
  User.findById(req.params.user_id, function (err, user) {
    if (err) res.send(err);
    res.json(user);
  });
}

exports.register = function (req, res) {
  let hashedPassword = bcrypt.hashSync(req.body.password, 8);
  //Create user with args in the post request
  User.create(
    {
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword
    },
    function (err, user) {
      // Check if correct
      if (err) return res.status(500).send("There was a problem registering the user.");
      // create a token
      var token = jwt.sign({id: user._id}, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({auth: true, token: token});
    }
  );
}

exports.login = function (req, res) {
  //Retrieve user by its mail
  User.findOne({email: req.body.email}, function (err, user) {
    //Error dealing
    if (err) return res.status(500).send("Error on the server.");
    if (!user) return res.status(404).send("No user found.");
    //Check the validity of password
    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    // If not valid 401 = unauthorized
    if (!passwordIsValid)
      return res.status(401).send({auth: false, token: null});
    // Assign token
    var token = jwt.sign({id: user._id}, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    // send

    res.status(200).send({auth: true, token: token});
  });
}

exports.account = function (req, res) {
  // Get the token in the header
  var token = req.headers["x-access-token"];
  console.log(req.headers)
  //Deal if not found
  if (!token)
    return res.status(401).send({auth: false, message: "Not authorized."});
  jwt.verify(token, config.secret, function (err, decoded) {
    //or found but not correct
    if (err)
      return res
        .status(500)
        .send({auth: false, message: "Failed to authenticate token.", error: err});
    //retrieve user
    User.findById(
      decoded.id,
      {password: 0, passwordConf: 0}, //Avoid sending the password
      function (err, user) {
        if (err)
          return res
            .status(500)
            .send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        //Send its data
        console.log(user);
        res.status(200).send(user);
      }
    );
  });
}


exports.updateUser = function (req, res) {
}


exports.deleteUser = function (req, res) {

}
