var express = require("express");
var router = express.Router();
var User = require("./../models/user");
var path    = require("path");

const userController = require("./../controllers/userController");

//HOME
router.route("/").all(function(req, res) {
  res.sendFile(path.join(__dirname+'/../../dist/index.html'));
  // prod => res.sendFile(path.join(__dirname+'/../../dist/index.html'));
});


/********************************************
 *              ROADS : USERS               *
 ********************************************/

/*===========*
 *   Type    *
 *===========*/

/* fetch all the users */
router.route("/users").get(function(req, res) {
  userController.findAllUser(req,res)
});

router
  .post("/register", function(req, res) {
    userController.register(req,res);
  })
  .post("/login", function(req, res) {
    userController.login(req,res);
  })
  .get("/account", function(req, res) {
    userController.account(req,res);
  });

/*===========*
 * Instance  *
 *===========*/

router.route("/users/:user_id")
  .get(function(req, res) {
    userController.findOneUser(req,res);
  })
  .put(function(req, res) {
    //userController.updateUser(req,res);
  })
  .delete(function(req, res) {
    //userController.deleteUser(req,res);
  });


module.exports = router;
