const userController = require("./../controllers/userController");
const wineStoryController = require("./../controllers/wineStoryController");
const wineController = require("./../controllers/wineController");
/*
exports.search = async function (req, res) {
    let ret = [];
    for (let i = 0; i < req.query.categories.length; i++) {
        console.log(req.query.categories);
        switch (req.query.categories[i]) {
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
    console.log("Buuuuuuuuuuuuuuuuuuuuuuuuuuuuuuttttttttt", ret);
    res.send(ret)

}*/