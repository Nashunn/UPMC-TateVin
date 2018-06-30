var express = require("express");
var router = express.Router();
var path = require("path");

const userController = require("./../controllers/userController");
const wineStoryController = require("./../controllers/wineStoryController");
const wineController = require("./../controllers/wineController");
const tagController = require("./../controllers/tagController");
const searchController = require("./../controllers/searchController");
const commentController = require("./../controllers/commentController");
const opinionController = require("./../controllers/opinionController");
const producerController = require("./../controllers/producerController")
const wineListController = require("./../controllers/wineListController")
//HOME
router.route("/").all(function (req, res) {
    res.sendFile(path.join(__dirname + '/../../dist/index.html'));
    // prod => res.sendFile(path.join(__dirname+'/../../dist/index.html'));
});


/********************************************
 *             ROADS : Search               *
 ********************************************/
router.get("/search", searchController.search)

/**~~~~~~~~~~~~~~~END Search~~~~~~~~~~~~~~~~~**/

/********************************************
 *                ROADS : Tag               *
 ********************************************/

/*===========*
 *   Type    *
 *===========*/

/* fetch all the users */
router.get("/tags", tagController.findAll)
router.post("/tags", tagController.findByType)

router
    .post("/tag", tagController.createTag);

/*===========*
 * Instance  *
 *===========*/

/**~~~~~~~~~~~~~~~END Tag~~~~~~~~~~~~~~~~~**/

/********************************************
 *              ROADS : USERS               *
 ********************************************/

/*===========*
 *   Type    *
 *===========*/
router
    .get("/users", userController.findAllUser)
    .post("/register", userController.register)
    .post("/login", userController.login)
    .get("/account", userController.account)
    .get("/usersByIds/", userController.findByIds);
/*===========*
 * Instance  *
 *===========*/
router
    .get("/user/:idMongo", userController.findByIdUser)
    .get("/users/sample/:count", userController.findSomeUsers)
    .get("/users/:user_id", userController.findOneUser) //need to remove password
    .get("/users/:user_id/activity", userController.activity)
    .put("/users/:user_id", userController.updateUser)
    .put("/users/:user_id/:idMongo", userController.addSub)
    .delete("/users/:user_id/:idMongo", userController.removeSub)
    .delete("/users/:user_id", userController.deleteUser);

/**~~~~~~~~~~~~~~~~~END USER~~~~~~~~~~~~~~~~~**/

/********************************************
 *                ROADS : Wine              *
 ********************************************/

/*===========*
 *   Type    *
 *===========*/

/* fetch all the users */
router
    .get("/wines/pagination/:page", wineController.findAll)
    .get("/winesByStory/:id_story", wineController.findByStory)

router
    .post("/wine", wineController.createWine)
    .put("/wineAddComment", wineController.addComment)
    .get("/wineGetComments", commentController.getArray)

/*===========*
 * Instance  *
 *===========*/
router
    .get("/wine/:wine_id", wineController.findOneWine)
    .get("/wineBarCode", wineController.findOneWineByBarCode)
    .put("/wineBarCode/:id_wine", wineController.addCB)
    .put("/wine/:wine_id", wineController.modifyWine)

/**~~~~~~~~~~~~~~~END Wine~~~~~~~~~~~~~~~~~**/

router
    .post("/wineList", wineListController.createList)
    .put("/wineList/:id_cave", wineListController.addWine)
    .put("/userCreateCave/:user_id", userController.updateUser)
    .get("/wineList/:id_cave", wineListController.findAll)
/********************************************
 *           ROADS : Wine Story             *
 ********************************************/

/*===========*
 *   Type    *
 *===========*/

/* fetch all the users */
router
    .get("/wineStory/:id_wineStory", wineStoryController.findOneByIdd)
    .get("/wineStoryGetComments", commentController.getArray)
    .get("/wineStory", wineStoryController.findAll)
    .post("/wineStory", wineStoryController.createWS)
    .put("/wineStoryAddComment", wineStoryController.addComment)
    .put("/wineStory/:id_wineStory", wineStoryController.updateStory)

/*===========*
 * Instance  *
 *===========*/
router
    .delete("/wineStory/:ws_id", wineStoryController.deleteWS);

/**~~~~~~~~~~~~~~~~~END WS~~~~~~~~~~~~~~~~~**/

/*********************************************************
*                        ROADS : Comments                *
**********************************************************/
router
    .post("/comment", commentController.createComment)
    .get("/comments", commentController.findAll)
    .put("/comment/:id_comment", commentController.addVote);
/**~~~~~~~~~~~~~~~END Comments~~~~~~~~~~~~~~**/

/*********************************************************
 *                    ROADS : Producer                   *
 **********************************************************/
router
.post("/registerProductor", producerController.register)
.get("/producers/:username", producerController.findByName)
.get("/findproducer/:idProd", producerController.findById)
.get("/producer/account", producerController.account)
.post("/producer/login", producerController.login)
.put("/producer/:id_wine/:id_prod", wineController.addProd)
.put("/producer/:id_wine/:id_prod/comment", wineController.addProdComment)
/**~~~~~~~~~~~~~~~END Opinion~~~~~~~~~~~~~~**/

/*********************************************************
 *                    ROADS : Opinion                    *
 **********************************************************/
router
    .get("/opinions", opinionController.getOpinionBy)
    .get("/opinions/:id_wine", opinionController.getOpinionForWine)
    .put("/opinions/:id_wine/:id_user", opinionController.updateOpinion)

/**~~~~~~~~~~~~~~~END Opinion~~~~~~~~~~~~~~**/

module.exports = router;
