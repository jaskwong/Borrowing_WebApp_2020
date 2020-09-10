var express = require("express");
var router = express.Router();
var db = require('../database').db;

function getRequestBody(req) {
    return new Promise(function (resolve, reject) {
        resolve(req.body);
        reject(null);
    })
}


router.get("/", function (req, res, next) {
    res.send("Hoi");
})

router.get("/viewgroup", function (req, res, next) {
    // console.log(req.query.groupid);
    db.viewUser(parseInt(req.query.groupid)).then(rows => {
        res.send(rows);
    })
})

router.post('/creategroup', function (req, res, next) {
    getRequestBody(req).then(body => {
        return body;
    }).then(body => {
        return db.createBorrowGroup(body.groupname)
    }).then(rows => {
        res.sendStatus(200);
    })

});

module.exports = router;