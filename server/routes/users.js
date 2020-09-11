var express = require('express');
var router = express.Router();
var db = require('../database').db;

function getReqBody(req) {
    return new Promise((resolve, reject) => {
        try {
            resolve(req.body);
        } catch (err) {
            reject(err);
        }
    })
}

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/createuser', function (req, res, next) {
    getReqBody(req).then(body => {
        let userID = body.userID;
        let groupID = body.groupID;
        return db.createUser(userID, groupID)
    }).then(rows => {
        res.sendStatus(200);
    })
});

module.exports = router;
