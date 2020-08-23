var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testcreategroupRouter = require('./routes/testcreategroup')


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/testcreategroup", testcreategroupRouter)


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
borrow("item3", 1, "user1.1", 1)




module.exports = app;
