const Wine = require("../models/wine");

exports.findAll = function (req, res) {
  Wine.find(function (err, users) {
    if (err) {
      res.send(err);
    }
    res.json(users);
  });
};


exports.createWine = function (req, res) {
  var cepage = req.body.grapeTag;


  Wine.create(
    {
      name: req.body.name,
      terroir: req.body.terroir,
      type: req.body.type,
      classification: req.body.classification,
      gaz: req.body.isGaz,
      grape: req.body.grapeTag,
      keep_in_cave: req.body.keepInCave,
      decantation: req.body.decantation, //Carrafage
      year: req.body.year, //Millesime
    },
    function (err, user) {
      // Check if corrects
      console.log(err)
      if (err) return res.status(500).send("There was a problem registering the WineStory.");
      console.log(user)
      // create a token
      res.status(200).send({msg: "Wine created", wine:user})
    }
  );
}
