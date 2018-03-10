/**
 Database implementation for custom funds
 created on 4th March 2018 by benjylxwang
**/

const GLOBAL_ACCOUNT_ID = 3;
const DEFAULT_CURRENCY = "GBP";

let db = exports;
let sql = require('mysql')

let con = sql.createConnection({
    host: "localhost",
    user: "username",
    password: "pass",
    database: "custom-funds"
});

/**
    Adds an account to the service
**/
db.addAccount = function(name, type, start_balance, currency, owner, callback) {
    con.connect(function(err) {
        if (err) throw err;

        // Create account
        let sql = "INSERT INTO accounts (Name, Type, Balance, Currency, Owner) VALUES ?";
        let data = [name, type, 0, currency, owner];
        con.query(sql, data, function(err, result) {
            if (err) throw err;
            console.log("Account successfully added: " + name + " (ID: " + result.insertID + ")");

            if (start_balance > 0) {
                // Add start_balance
                let sql = "INSERT INTO transactions (Description, AccountFrom, AccountTo, Type, Amount, Currency) VALUES ?";
                let data = ["Starting balance", GLOBAL_ACCOUNT_ID, result.insertID, "INIT", start_balance, DEFAULT_CURRENCY];
                con.query(sql, data, function(err, result) {
                    if (err) throw err;
                    console.log("Account successfully initialized: " + start_balance + " (ID: " + result.insertID + ")");
                });
            }

            callback(result.insertID);
        });
    });
}

/**
    Adds a user to the service
**/
db.addUser = function(username, password, email, name, callback) {
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        let sql = "INSERT INTO users (username, name, email, password) VALUES ?";
        let data = [username, name, email, password];
        con.query(sql, data, function(err, result) {
            if (err) throw err;
            console.log("User successfully added: " + username + " (ID: " + result.insertID + ")");
            callback("Success");
        });
    });
}

/**
    Authentication of user
    Note that password should be hashed on the frontend for security
**/
db.authenticate = function(username, password, callback) {
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        let sql = "SELECT ID, username, password FROM users WHERE username = ?";
        con.query(sql, username, function(err, result) {
            if (err) throw err;
            if (result[0].password == password) {
                let user = {
                    authenticated: true,
                    username: username,
                    id: result[0].ID
                }
                callback(user);
            } else {
                let user = {
                    authenticated: false
                }
                callback(user);
            }
        });
    })
}
