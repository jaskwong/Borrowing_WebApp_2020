var express = require("express");
var router = express.Router();
var db = require('../database').db;


router.get("/", function (req,res,next){
    res.send("Hoi");
})

router.get("/viewgroup", function (req,res,next){
    // console.log(req.query.groupid);
    db.viewUser(parseInt(req.query.groupid)).then(rows => {
        res.send(rows);
    })
})

router.post('/creategroup', function (req, res, next) {
    db.createBorrowGroup(req.body.groupname).then(rows => {
        console.log(rows);
        res.sendStatus(200)
    })

});

module.exports=router;