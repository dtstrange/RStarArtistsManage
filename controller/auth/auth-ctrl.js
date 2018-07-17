const models = require("../../models");
const crypto = require('crypto');
// const jwt = require("jsonwebtoken");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const ctrl = {};
const fs = require('fs')

function getHash(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}
function getSalt() {
    return crypto.randomBytes(16).toString("hex");
}
// function generateJWT(user) {
//     let expire = new Date();
//     expire.setDate(expire.getDate() + 1);
//     return jwt.sign({
//         id: user.id,
//         email: user.email,
//         username: user.username,
//         exp: expire.getTime() / 1000
//     }, process.env.JWT_SECRET);
// }
// ctrl.login = function(req, res) {
//     let user = req.body.user;
//     let password = req.body.password;
//     console.log(user);
//     models.User.findOne({where: {
//         [Op.or]: [{
//             email: user
//         },{
//             username: user
//         }]  
// }})
//     .then(function(resp) {
//         if(resp) {
//             //login
//             var inputHash = getHash(password, resp.salt);
//             console.log(inputHash.toString(), resp.hash);
//             if(inputHash === resp.hash) {
//                 res.json({token: generateJWT(resp)});
//             }
//             else {
//                 return res.status(400).end('Wrong Password');
//             }
//         }
//         else {
//             //err
//             return res.status(404).end('User not found');
//         }
//     })
//     .catch(function(err) {
//         console.log(err);
//         res.status(500).json({message:'Something went wrong', error: err})
//     })
// };
ctrl.register = function (req, res) {
    console.log("register")
    var user = {
        username: inqUser.username,
        email: inqUser.email
    }
    var salt = getSalt();
    var hash = getHash(inqUser.password, salt);
    user.salt = salt;
    user.hash = hash;
    models.User.create(user)
        .then(function (resp) {
            console.log({ success: true });
        })
        .catch(function (err) {
            console.error(err);
            throw err;
        });
};

ctrl.update = function (req, res) {
    console.log("update")
    let user = {}
    if (inqUser.username) {
        user.username = inqUser.username.trim();
    }
    if (inqUser.email) {
        user.email = inqUser.email.trim().toLowerCase()
    }
    if (inqUser.password) {
        user.salt = getSalt();
        user.hash = getHash(inqUser.password, user.salt);
    }
    console.log(user);
    models.User.update(user, { where: { id: inqUser.id } })
        .then(function (resp) {
            console.log({ success: true });
            
        })
        .catch(function (err) {
            console.error(err);
            throw err;
        });
};





module.exports = ctrl;
