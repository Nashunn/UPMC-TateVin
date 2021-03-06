const Tag = require("../models/tag");

exports.TAGS_TYPE = Object.freeze({CEPAGE: "cépage", DIVERS: "divers", SMELL:'smell', VISUAL:'visual', TASTE:'taste'})

exports.findAll = function (req, res) {
  Tag.find(function (err, tags) {
    if (err) {
      res.send(err);
    }
    res.json(tags);
  });
};
exports.findByType = function (req, res) {
  Tag.find({type: req.body.type},function (err, tags) {
    if (err) {
      res.send(err);
    }
    res.json(tags);
  });
};

exports.createTagIfNotCreated = function (label, type) {
    let tags=[];
    for (let i = 0; i < label.length; i++) {
    Tag.find({label: label[i], type: type}, (err, results) => {
      if (!results.length)
      {
        this.createTag(label[i], type)
      }

    });

  }
}

exports.createTag = function (name, type) {
  Tag.create(
    {
      type: type.toUpperCase(),
      label: name
    },
    function (err, user) {
      // Check if corrects
      if (err) return "There was a problem registering the Tag.";
    
      // create a token
      return ({msg: "Tag created", tag: user})
    }
  );
}
