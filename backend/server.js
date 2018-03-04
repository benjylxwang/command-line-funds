/**
    Server implementation for the custom funds application
**/

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let auth = require('basic-auth');
app.use(bodyParser.json());

// Require model & API
let model = require('./model.js');
let api = require('./api.js');
api.init(model);

// API IMPLEMENTATION
// Public pages
app.get("/", express.static('../frontend/public'));
app.get("/favicon.ico", express.static('../frontend/public'));
app.get("/public/*", express.static('../frontend/public'));

// Register a new user
app.post("/user", function(req, res) {
    // TODO
});

// Everything else requires authentication
app.use(authenticate);

/**
 * Use HTTP BasicAuth to protect API endpoints further down in the
 * pipeline from unauthenticated access. On successful authentication,
 * req.authenticated_user is set to the username of the authenticated
 * user.
 */
function authenticate(req, res, next) {
    let login = auth(req);
    if (login === undefined || login.name === undefined || login.pass === undefined) {
        sendAuthRequest(res);
    } else {
        if(!api.authenticateUser(login.name, login.pass)) {
            sendAuthRequest(res);
        } else {
            req.authenticated_user = login.name;
            next(); // continue processing pipeline
        }
    }
}
