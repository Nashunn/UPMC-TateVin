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
}
