var WineStory = require("../models/wineStory");

exports.findAll = function (req, res) {
  WineStory.find(function (err, users) {
    if (err) {
      res.send(err);
    }
    res.json(users);
  });
};


exports.createWS = function (req, res) {
  WineStory.create(
    {
      author: req.body.userID,
      title: req.body.title,
      text: req.body.text,
      image: req.body.img,
      wine: req.body.wines,
      tags: req.body.tags,
      comments: req.body.comments
    },
    function (err, user) {
      // Check if corrects
      console.log(err)
      if (err) return res.status(500).send("There was a problem registering the WineStory.");
      console.log(user)
      // create a token
      res.status(200).send({msg: "WineStory created"})
    }
  );
}

exports.deleteWS = function (req, res) {
  WineStory.findByIdAndRemove(req.idWS, (err) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send({msg: "Wine story deleted ! "});
  });
}
