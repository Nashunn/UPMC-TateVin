var Producer = require("../models/producer");
var jwt = require("jsonwebtoken");
var config = require("./../../config/config");
var bcrypt = require("bcryptjs");
let shortid= require("shortid");


exports.register = function (req, res) {
    let hashedPassword = bcrypt.hashSync(req.body.password, 8);

    Producer.create(
        {
            id:shortid.generate(),
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            avatar: req.body.avatar,
            num_siret:    req.body.siret,
            phone :   req.body.phone,
            adresse:  req.body.adresse,
            website:  req.body.website
        },
        function (err, user) {
            // Check if correct

            if (err) return res.status(500).send("There was a problem registering the user.");
            // create a token
            var token = jwt.sign({id: user._id}, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({auth: true, token: token});
        }
    );
}

exports.findByName = function (req, res) {
    Producer.find({username: req.params.username}, function (err, user) {
        if (err) res.send(err);
        res.json(user);
    });
}

exports.findById = function (req,res){
    Producer.find({_id: req.params.idProd}, function (err, user) {
        if (err) res.send(err);
        res.json(user);
    });
}

exports.login = function (req, res) {
    //Retrieve user by its mail

    Producer.findOne({email: req.body.email}, function (err, user) {
        //Error dealing
        if (err) return res.status(500).send("Error on the server.");
        if (!user) return res.status(404).send("No user found.");
        //Check the validity of password
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        // If not valid 401 = unauthorized
        if (!passwordIsValid)
            return res.status(401).send({auth: false, token: null});
        // Assign token
        var token = jwt.sign({id: user._id}, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        // send

        res.status(200).send({auth: true, token: token});
    });
}

exports.account = function (req, res) {
    // Get the token in the header
    var token = req.headers["x-access-token"];


    //Deal if not found
    if (!token)
        return res.status(401).send({auth: false, message: "Not authorized."});

    jwt.verify(token, config.secret, function (err, decoded) {
        //or found but not correct
        if (err)
            return res
                .status(500)
                .send({auth: false, message: "Failed to authenticate token.", error: err});
        //retrieve user
        Producer.findById(
            decoded.id,
            {password: 0, passwordConf: 0}, //Avoid sending the password
            function (err, user) {
                if (err)
                    return res
                        .status(500)
                        .send("There was a problem finding the user.");
                if (!user) return res.status(404).send("No user found.");
                //Send its data

                res.status(200).send(user);
            }
        );
    });

}
