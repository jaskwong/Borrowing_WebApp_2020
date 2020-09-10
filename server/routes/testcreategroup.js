var express = require("express");
var router = express.Router();

var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'borrowApp2020',
    database: 'borrowApp_db'
})

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
})

function viewUser(response, groupid){

    connection.query(
        'SELECT userid FROM users WHERE groupid = ?', [groupid],
        function (err, rows, fields) {
            if (err) throw err
            console.log(JSON.stringify(rows))
            response.send(JSON.stringify(rows))
        })
}

router.get("/", function (req,res,next){
    res.send("Hoi");
})

router.get("/viewgroup", function (req,res,next){

    // console.log(req.query.groupid);
    viewUser(res, parseInt(req.query.groupid));
})

module.exports=router;