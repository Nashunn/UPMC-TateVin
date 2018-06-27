const Tag = require("../models/tag");

exports.TAGS_TYPE = Object.freeze({CEPAGE: "cépage", DIVERS: "divers", SMELL:'smell'})

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
    console.log(label);
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
  console.log("creating tag");
  Tag.create(
    {
      type: type.toUpperCase(),
      label: name
    },
    function (err, user) {
      // Check if corrects
      if (err) return "There was a problem registering the Tag.";
      console.log(user)
      // create a token
      return ({msg: "Tag created", tag: user})
    }
  );
}
