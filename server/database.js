// sourced from https://codeburst.io/node-js-mysql-and-promises-4c3be599909b
const mysql = require( 'mysql' );
class Database {
    constructor() {
        this.connection = mysql.createConnection( {
            host: 'localhost',
            user: 'root',
            password: 'borrowApp2020',
            database: 'borrowApp_db'
        } );
    }
    async query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
    async createBorrowGroup(grpname) {
        let groupid = Math.floor(Math.random() * 1000);
        let temp = await this.query(`INSERT INTO borrowgroups
                     VALUES (?,?)`,
            [groupid, grpname]);
        let rows = await this.query(`SELECT * FROM borrowgroups
                     WHERE groupid = ?`,
            [groupid]);
        return rows;
    }
    async viewUser(groupid) {
        try {
            let rows = await this.query('SELECT userid FROM users WHERE groupid = ?', [groupid])
            return JSON.stringify((rows));
        } catch (err) {
            console.log("error with viewUser")
        }
    }

    async createUser(userid, groupid) {
        try {
            await this.query('INSERT INTO users VALUES (?,?)',
                [userid, groupid]);
            let rows = await this.query('SELECT * FROM users WHERE userid = ? AND groupid = ?',
                [userid, groupid]);
            return JSON.stringify(rows);
        } catch (err) {
            console.log("error with createUser")
        }
    }
    async deleteUser(userid, groupid) {
        try {
            await this.query('DELETE FROM users WHERE users.userid = ? AND users.groupid = ?',
                [userid, groupid]);
            let rows = await this.query('SELECT * FROM users');
            return JSON.stringify(rows);
        } catch (err) {
            console.log("error with deleteUser")
        }
    }
    async addItem(itemname, groupid, total, itemType) {
        try {
            await this.query('INSERT INTO items VALUES (?,?,?,?,?)',
                [itemname, groupid, total, total, itemType]);
            let rows = await this.query('SELECT * FROM items WHERE items.itemname = ? AND items.groupid = ?',
                [itemname, groupid]);
            return JSON.stringify(rows);
        } catch (err) {
            console.log("problem with addItem")
        }
    }
    async modifyItem(itemname, groupid){
        try {
            await this.query('DELETE FROM items WHERE items.itemname = ? AND items.groupid = ?',
                [itemname, groupid]);
            let rows = await this.query('SELECT * FROM items WHERE items.itemname = ? AND items.groupid = ?',
                [newname, groupid]);
            return JSON.stringify(rows);
        } catch (err) {
            console.log("problem with modifyItem")
        }
    }
    async deleteItem(){
        try {
            await this.query('INSERT INTO items VALUES (?,?,?,?,?)',
                [itemname, groupid, total, total, itemType]);
            let rows = await this.query('SELECT * FROM items');
            return JSON.stringify(rows);
        } catch (err) {
            console.log("problem with deleteItem")
        }
    }
    async borrowItems(itemname, groupid, userid, amount){
        //TODO might need to be altered if we change schema
        try {
            var remaining = 0;
            let rows = await this.query('SELECT * FROM items WHERE items.itemname = ? AND groupid = ?',
                [itemname, groupid]); //Get remaining amount of item
            //TODO i need to fix this
            //remaining = rows[0].remaining;
            console.log('remaining: ' + remaining);
            let newRemaining = remaining - amount;
            console.log('newRemaining: ' + newRemaining);

            await this.query('UPDATE items SET items.remaining = ? WHERE items.itemname = ? AND groupid = ?',
                [newRemaining, itemname, groupid]); //Update remaining amount of item

            var borrowid = Math.floor(Math.random() * 1000);
            console.log("borrowID: " + borrowid);
            var date = new Date();
            await this.query('INSERT INTO borrowed VALUES (?,?,?,?,?,?)',

                [borrowid, itemname, groupid, userid, amount, date]);// Insert new borrowed item into borrowed

            rows = await this.query('SELECT * FROM borrowed WHERE borrowed.borrowid = ?',
                [borrowid]);
            return JSON.stringify(rows);
        } catch (err) {
            console.log("problem in borrowItems")
        }
    }
    async returnItems(borrowid, amount){
        var returnid = Math.floor(Math.random() * 1000);
        var date = new Date();

        let rows = await this.query('SELECT * FROM borrowed WHERE borrowed.borrowid = ?',
            [borrowid]);

        //TODO I NEED TO FIX THIS
        //var itemname = rows[0].itemname;
        //var groupid = rows[0].groupid;

        let items = await this.query('SELECT * FROM items WHERE items.itemname = ? AND items.groupid = ?',
            [itemname, groupid]);
        var newremaining = items[0].remaining + amount;

        await this.query('UPDATE items SET items.remaining = ? WHERE items.itemname = ? AND groupid = ?',
            [newremaining, itemname, groupid]); //Update remaining amount of item


        await this.query('INSERT INTO returned VALUES (?,?,?,?)',
            [returnid, borrowid, amount, date])
    }

}

module.exports = {
    db: new Database()
}