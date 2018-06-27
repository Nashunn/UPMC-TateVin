const userController = require("./../controllers/userController");
const wineStoryController = require("./../controllers/wineStoryController");
const wineController = require("./../controllers/wineController");

exports.search = async function (req, res) {
    var cat=["vin", "hdv", "utilisateur"];
    if(req.query.categories){
        cat=req.query.categories;
    }
    console.log("recherece");
    let ret = [];
    for (let i = 0; i <cat.length; i++) {
        console.log(cat);
        switch (cat[i]) {
            case 'vin':
                let query = {}
                if (req.query.terroir) query.terroir = req.query.terroir;
                if (req.query.domaine) query.domaine = req.query.domaine;
                if (req.query.millesime) query.millesime = req.query.millesime;
                if (req.query.tags) query.name = req.query.tags;
                ret.push(await wineController.searchWine(query));
                break;
            case 'hdv':
                ret.push(await wineStoryController.findWSByTags(req.query.tags));
                break;
            case 'utilisateur':
                ret.push(await userController.findUserByUsername(req.query.tags));
                break;
            default:
                console.log("default")
        }
    }
    res.send(ret);
}
