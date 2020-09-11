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
            console.log(userid)
            console.log(groupid)
            await this.query(`INSERT INTO users VALUES (?,?)`,[userid,groupid])
            let rows = await this.query(`SELECT * FROM users
                     WHERE userid = ?`,
                [userid]);
            return rows;
        } catch (err) {
            console.log("error with createuser")
        }
    }

}

module.exports = {
    db: new Database()
}