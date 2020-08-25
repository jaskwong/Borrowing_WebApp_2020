var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testcreategroupRouter = require('./routes/testcreategroup')
const bodyParser= require('body-parser')


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/testcreategroup", testcreategroupRouter)

var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'borrowApp2020',
    database: 'borrowApp_db'
})

var db = require('./database').db;

function borrow(itemName, groupID, userID, amount) {
    var remaining = 0;
    db.query(`SELECT * FROM items WHERE itemname = ? AND groupid = ?`, [itemName, groupID])
        .then(rows => {
            remaining = rows[0].remaining;
            console.log('remaining: ' + remaining)
            // TODO: add error checking amount > remaining
            let newRemaining = remaining - amount;
            console.log('newRemaining: ' + newRemaining)
            db.query("UPDATE items SET remaining = ? WHERE itemname = ? AND groupid = ?", [newRemaining, itemName, groupID]);
        })
        .then(rows => {
            // TODO: decide how to generate borrowID or check that id is not already in use
            var borrowID = Math.floor(Math.random() * 1000); // random 9 digit number
            console.log("borrowID: " + borrowID);
            // TODO: decide how to manage timezones
            var datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
            db.query(`INSERT INTO borrowed VALUES (?, ?, ?, ?, ?, ?)`, [borrowID, itemName, groupID, userID, amount, datetime])
        }).then(rows => {
        db.close();
    })
}

function viewUser(groupid){

    connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    })

    connection.query(
        'SELECT userid FROM users WHERE groupid = ?', [groupid],
        function (err, rows, fields) {
            if (err) throw err

            console.log(rows)
        })

}

function viewItems(groupid){

    connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    })

    connection.query(
        'SELECT * FROM items WHERE groupid = ?', [groupid],
        function (err, rows, fields) {
            if (err) throw err

            console.log(rows)
        })

}

function viewBorrowed(groupid, filt_users, filt_items){
    // assuming in front end we'd need to use viewUser and viewItems to grab a list of all users/items
    // filt_items is list of itemnames we're looking for, filt_users is a list of usernames
    // Note: they automatically convert arrays to proper sql-formatted arrays

    connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    })

    // no filtered items
    if (filt_users.length == 0 && filt_items.length == 0){
        connection.query(
            `
            SELECT 
                itemname, userid, amount, borrowdate 
            FROM borrowed 
            WHERE groupid = ?
            `, [groupid],
            function (err, rows, fields) {
                if (err) throw err

                console.log(rows)
            })
    }

    // filter by item but not user
    else if (filt_users.length == 0){
        connection.query(
            `
            SELECT 
                itemname, userid, amount, borrowdate 
            FROM borrowed 
            WHERE groupid = ? AND itemname IN (?)
            `, [groupid, filt_items],
            function (err, rows, fields) {
                if (err) throw err

                console.log(rows)
            })

    }

    // filter by user but not item
    else if (filt_items.length == 0){
        connection.query(
            `
            SELECT 
                itemname, userid, amount, borrowdate 
            FROM borrowed 
            WHERE groupid = ? AND userid IN (?)
            `, [groupid, filt_users],
            function (err, rows, fields) {
                if (err) throw err

                console.log(rows)
            })

    }

    // filter by both
    else {
        connection.query(
            `
            SELECT 
                itemname, userid, amount, borrowdate 
            FROM borrowed 
            WHERE groupid = ? AND itemname IN (?) AND userid IN (?)
            `, [groupid, filt_items, filt_users],
            function (err, rows, fields) {
                if (err) throw err

                console.log(rows)
            })

    }

}

function viewReturned(groupid, filt_users, filt_items){
    // assuming in front end we'd need to use viewUser and viewItems to grab a list of all users/items
    // filt_items is list of itemnames we're looking for, filt_users is a list of usernames
    // Note: they automatically convert arrays to proper sql-formatted arrays

    connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    })

    // no filtered items
    if (filt_users.length == 0 && filt_items.length == 0){
        connection.query(
            `
            SELECT 
                returned.amount, returned.returndate, borrowed.itemname, borrowed.userid, borrowed.borrowdate
            FROM borrowed INNER JOIN returned ON borrowed.borrowid=returned.borrowid 
            WHERE borrowed.groupid = ?
            `, [groupid],
            function (err, rows, fields) {
                if (err) throw err

                console.log(rows)
            })
    }

    // filter by item but not user
    else if (filt_users.length == 0){
        connection.query(
            `
            SELECT 
                returned.amount, returned.returndate, borrowed.itemname, borrowed.userid, borrowed.borrowdate 
            FROM borrowed INNER JOIN returned ON borrowed.borrowid=returned.borrowid
            WHERE borrowed.groupid = ? AND borrowed.itemname IN (?)
            `, [groupid, filt_items],
            function (err, rows, fields) {
                if (err) throw err

                console.log(rows)
            })

    }

    // filter by user but not item
    else if (filt_items.length == 0){
        connection.query(
            `
            SELECT 
                returned.amount, returned.returndate, borrowed.itemname, borrowed.userid, borrowed.borrowdate 
            FROM borrowed INNER JOIN returned ON borrowed.borrowid=returned.borrowid
            WHERE borrowed.groupid = ? AND borrowed.userid IN (?)
            `, [groupid, filt_users],
            function (err, rows, fields) {
                if (err) throw err

                console.log(rows)
            })

    }

    // filter by both
    else {
        connection.query(
            `SELECT 
                returned.amount, returned.returndate, borrowed.itemname, borrowed.userid, borrowed.borrowdate 
            FROM borrowed INNER JOIN returned ON borrowed.borrowid=returned.borrowid
            WHERE borrowed.groupid = ? AND borrowed.itemname IN (?) AND borrowed.userid IN (?)
            `, [groupid, filt_items, filt_users],
            function (err, rows, fields) {
                if (err) throw err

                console.log(rows)
            })

    }

}

//viewUser(1)

//viewItems(1)

//viewBorrowed(1, [], [])

//borrow("item3", 1, "user1.1", 1)




module.exports = app;
