const Wine = require("../models/wine");
const TagController = require("./tagController");
const OpinionController = require("./opinionController");

let shortid = require("shortid");

exports.findAll = function (req, res) {
    Wine.find(function (err, users) {
        if (err) {
            res.send(err);
        }
        res.json(users);
    });
};

exports.findOneWine = function (req, res) {
    Wine.findOne({_id: req.params.wine_id}, async function(error, result) {
        let ret = [];

        if(error)
            res.status(500).send(error);

        ret.push(result);

        // Go get wine score
        let jsonOpinion = { wine_id: result._id };
        let opinions = await OpinionController.getScoreByWine(jsonOpinion);
        let score = await this.getAvgScore(opinions);

        ret.push(await score);

        // if all ok
        res.status(200).send(ret);
    })
};

exports.createWine = function (req, res) {
    //let grapes = req.body.grapeTag;
    //TagController.createTagIfNotCreated(grapes, TagController.TAGS_TYPE.CEPAGE)
    Wine.create(
        {
            id: shortid.generate(),
            name: req.body.name,
            millesime: req.body.millesime, //Millesime
            terroir: null,
            type: req.body.type,
            classification: null,
            gaz: null,
            grape: null,
            keep_in_cave: null,
            decantation: null, //Carrafage
        },
        function (err, user) {
            // Check if corrects
            console.log(err)
            if (err) return res.status(500).send("There was a problem registering the Wine.");
            console.log(user)
            // create a token
            res.status(200).send({msg: "Wine created", wine: user})
        }
    );
}


exports.modifyWine = function (req, res) {
    Wine.findByIdAndUpdate(
        req.idWine,
        req.body,
        {new: true},
        (err, newWine) => {
            if (err) return res.status(500).send(err);
            return res.send(newWine);
        }
    )
}

/************************SEARCH**********************************/

exports.searchWine = async function (query) {
    return await Wine.find(query, async function (err, ws) {
        console.log(ws);
        return await ws;
    });
}

exports.addComment=function (req, res){
    Wine.findOneAndUpdate({id:req.body.id_ws},
        { $addToSet: { comments: req.body.id_comment } }
        ,function(err, ws){
        if (err) return res.status(500).send(err);
        return res.status(200).send({msg: "WS commented! "});
    });

}

/********************GET WINE INFORMATION ***********************/
getAvgScore = async function (scoreArray) {
    let nbVote = 0;
    let sumScore = 0;
    let ret;

    for(let i=0; i<scoreArray.length; i++) {
        if(scoreArray[i].score) {
            nbVote++;
            sumScore += scoreArray[i].score;
        }
    }

    ret = await {score: (sumScore/nbVote), nbVote: nbVote};

    return await ret;
}
