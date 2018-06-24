const Comment = require("../models/comment");
let shortid = require("shortid");

exports.findAll = function (req, res) {
  Comment.find(function (err, comments) {
    if (err) {
      res.send(err);
    }
    res.json(comments);
  });
};


exports.createComment = function (req, res) {
  console.log("creating comment");
  Comment.create(
    {
        id:"test",
        message: req.body.message,
        author: req.body.author,
    },
    function (err, comment) {
      // Check if corrects
      if (err) return "There was a problem registering the comment.";
      console.log(comment);
      res.status(200).send({msg: "comment created", comment:comment})
    }
  );
}
