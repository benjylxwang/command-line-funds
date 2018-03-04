/**
 Database implementation for custom funds
 created on 4th March 2018 by benjylxwang
**/

let db = exports;
let sql = require('mysql')

let con = sql.createConnection({
    host: "localhost",
    user: "username",
    password: "pass",
    database: "custom-funds"
});

db.addUser = function(username, password, email, name) {
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        let sql = "INSERT INTO users (username, name, email, password) VALUES ?";
        let data = [username, name, email, password];
        con.query(sql, data, function(err, result) {
            if (err) throw err;
            console.log("User successfully added: " + username + " (ID: " + result.insertID + ")");
        });
    });
}

db.authenticate = function(username, password) {
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
                return user;
            } else {
                let user = {
                    authenticated: false
                }
                return user;
            }
        });
    })
}
