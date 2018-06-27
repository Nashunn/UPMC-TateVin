const Opinion = require("../models/opinion");
const TagController = require("./tagController");

let shortid = require("shortid");

exports.createOpinion = function (req, res) {
    // Todo following this example :
    // let grapes = req.body.grapeTag;
    //TagController.createTagIfNotCreated(grapes, TagController.TAGS_TYPE.CEPAGE)
    Opinion.create(
        {
            id: shortid.generate(),
            id_user: req.body.id_user,
            id_wine: req.body.id_wine,
            price: req.body.price,
            score: req.body.score,
            smell: req.body.smell,
            visual: req.body.visual,
            taste: req.body.taste,
            moment: req.body.moment,
            heat: req.body.heat,
            food: req.body.food,
        },
        function (err, user) {
            // Check if corrects
            console.log(err);
            if (err) return res.status(500).send("There was a problem registering the Opinion.");

            console.log(user);
            // create a token
            res.status(200).send({msg: "Opinion created", wine: user})
        }
    );
}
exports.updateOpinion=function(req, res){
    console.log("ETAPE 1");

<<<<<<< HEAD
    console.log(req.body.smell);
    let query = {}
    let Tags = {};
    let isTaggable= false;
=======
    let query = {};
>>>>>>> 6f1fd54dc074bc96a8707737114ada18aaf0e60f
    if (req.body.price) query.price = req.body.price;
    if (req.body.score) query.score = req.body.score;
    if (req.body.smell) 
    {
        isTaggable = true;
        TagController.createTagIfNotCreated(req.body.smell, TagController.TAGS_TYPE.SMELL);
        query = { $addToSet: { smell:  req.body.smell}};
    }

    Opinion.update(
        {id_wine:req.params.id_wine, id_user:req.params.id_user},
        query,
        {upsert:true, new:true},
        function(err, result){

            if (err) return res.status(500).send("There was a problem registering the Opinion.");
            res.status(200).send({msg: "Opinion created", op: result});
            console.log(result);
        }
    );
}

exports.getOpinionForWine = function (req,res){
    console.log("fiesta")
    Opinion.find({id_wine: req.params.id_wine}, function(err, result) {
        //Error dealing
        console.log(result)
        if (err) return res.status(500).send("Error on the server.");
        if (!result) return res.status(404).send("No Opinion found.");

        res.status(200).send(result);
    });
}

exports.getOpinionBy = function (req, res) {
    let ret = [];
    let criterias = {};

    //Create criterias json
    if(req.query.criteriaName && req.query.criteriaValue)
        criterias[req.query.criteriaName] = req.query.criteriaValue;

    if(req.query.user_id)
        criterias['id_user'] = req.query.user_id;

    if(req.query.wine_id)
        criterias['id_wine'] = req.query.wine_id;

    Opinion.find(criterias, function(err, result) {
        //Error dealing
        if (err) return res.status(500).send("Error on the server.");
        if (!result) return res.status(404).send("No Opinion found.");

        res.status(200).send(result);
    });
}

exports.getScoreByWine = async function (query) {
    let criterias = {};

    if(query.wine_id)
        criterias['id_wine'] = query.wine_id;

    return await Opinion.find(criterias, async function(err, result) {
        return await result;
    });
}
