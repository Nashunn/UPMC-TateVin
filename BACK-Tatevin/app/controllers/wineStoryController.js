var WineStory = require("../models/wineStory");
var mongoose = require("mongoose");
const TagController = require("./tagController");

exports.findAll = function (req, res) {
  WineStory.find(function (err, users) {
    if (err) {
      res.send(err);
    }
    res.json(users);
  });
};
exports.findOneByIdd = function (req, res) {
    console.log("RECHERCHE");
    console.log(req.params.id_wineStory);
    WineStory.find({id: req.params.id_wineStory}, function (err, user) {
        if (err) res.send(err);
        res.json(user);
    });
}

exports.createWS = function (req, res) {
    console.log(req.body.tags);
    if(req.body.tags) TagController.createTagIfNotCreated(req.body.tags, TagController.TAGS_TYPE.DIVERS);
    if(req.body.wines){
        var winesId=req.body.wines;
        for(var i=0; i<winesId.length; i++){
            winesId[i]=mongoose.Types.ObjectId(winesId[i]);
        }
        console.log(winesId);
    }
  WineStory.create(
    {
      author: req.body.userID,
      title: req.body.title,
      text: req.body.text,
      image: req.body.image,
      wines: winesId,
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


/************************SEARCH**********************************/

exports.findWSByTags = async function (tags) {
    return await WineStory.find({tags:tags}, async function (err, ws) {
        return await ws;
    });
}


