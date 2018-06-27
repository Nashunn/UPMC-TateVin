var WineStory = require("../models/wineStory");
var mongoose = require("mongoose");
let shortid= require("shortid");
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
    WineStory.find({id: req.params.id_wineStory}, function (err, user) {
        if (err) res.send(err);
        res.json(user);
    });
}

exports.createWS = function (req, res) {
    if(req.body.tags) TagController.createTagIfNotCreated(req.body.tags, TagController.TAGS_TYPE.DIVERS);
    if(req.body.wines){
        var winesId=req.body.wines;
        for(var i=0; i<winesId.length; i++){
            winesId[i]=winesId[i]._id;
        }

    }
    console.log("CREATION DE STORY");
    console.log(req.body);
  WineStory.create(
    {
      id:shortid.generate(),
      author: req.body.author,
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
      // create a token
      res.status(200).send({msg: "WineStory created"})
    }
  );
}

exports.deleteWS = function (req, res) {
  console.log("EFFACE");
  console.log(req.params.ws_id);
  WineStory.findOneAndRemove({id: req.params.ws_id}, function (err, wine) {
          console.log(err);
          if (err) return res.status(500).send(err);
          return res.status(200).send({msg: "Wine story deleted ! "});
    });

    /*
  WineStory.findByIdAndRemove(req.ws_id, (err) => {

  });*/
}
exports.addComment=function (req, res){
    WineStory.findOneAndUpdate({id:req.body.id_ws},
        { $addToSet: { comments: req.body.id_comment } }
        ,function(err, ws){
        if (err) return res.status(500).send(err);
        return res.status(200).send({msg: "WS commented! "});
    });
}


exports.getWineByUser = function (username){
  return WineStory.find({author: username} ).limit(10).
  sort('-date').exec().then((result) => {
      return result;
    })
    .catch((err) => {
      return 'error occured';
    });
}

/************************SEARCH**********************************/

exports.findWSByTags = async function (tags) {
    var tagsTab=tags.split(',');

    return await WineStory.find({ tags: { $all: tagsTab}}, async function (err, ws) {
        console.log("RESULT");
        console.log(ws);
        return await ws;
    });
}
