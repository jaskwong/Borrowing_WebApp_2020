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


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post('/creategroup', function (req, res, next) {
  getReqBody(req).then(body => {
        let grpname = body.grpname
        let groupid = Math.floor(Math.random() * 1000);
        db.query(`INSERT INTO borrowgroups
                     VALUES (?,?)`,
            [groupid, grpname])
    }).then(rows => {
            res.sendStatus(200);
    }).catch(err => {
      console.log("error");
  })

});

module.exports = router;
