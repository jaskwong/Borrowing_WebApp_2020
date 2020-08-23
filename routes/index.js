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
      return db.createBorrowGroup(body.grpname)
    }).then(rows => {
            res.sendStatus(200);
    }).catch(err => {
      console.log(err);
  })

});

module.exports = router;
