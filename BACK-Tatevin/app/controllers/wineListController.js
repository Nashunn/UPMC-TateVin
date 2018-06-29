const WineList = require("../models/wineList");


exports.createList = function (req, res) {
    WineList.create(
        {
            wines:[]
        },
        function (err, wineList) {
            if (err) return res.status(500).send("There was a problem registering the Opinion.");
            res.status(200).send(wineList)
        }
    );
}
exports.addWine = function(req,res){

    WineList.findOneAndUpdate({_id:req.params.id_cave},
        { $addToSet: { wines: req.body.id_wine } }
        ,function(err, ws){
        if (err) return res.status(500).send(err);
        return res.status(200).send({msg: "WS commented! "});
    });
}
exports.findAll = function (req, res) {
    WineList.findOne ({_id: req.params.id_cave}, function(err,user){
        if (err) res.send(err);
        res.json(user);
    })
};
