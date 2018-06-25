const Comment = require("../models/comment");
const User = require("../models/user");
let shortid = require("shortid");

exports.findAll = function (req, res) {
  Comment.find(function (err, comments) {
    if (err) {
      res.send(err);
    }
    res.json(comments);
  });
};
exports.getArray = function(req, res){
    Comment.find({ '_id' : { $in: req.query.comments } }, function(err, comments){
        if (err) {
          res.send(err);
      }
    res.json(comments);
    });
};

exports.createComment = function (req, res) {
  Comment.create(
    {
        id:"test",
        message: req.body.message,
        author: req.body.author,
    },
    function (err, comment) {
      // Check if corrects
      if (err) return "There was a problem registering the comment.";

      res.status(200).send({msg: "comment created", comment:comment})
    }
  );
}
