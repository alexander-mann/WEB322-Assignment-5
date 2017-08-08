// create user schema
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
let Schema = mongoose.Schema;
var userSchema = new Schema({
    "user": {
        "type": String,
        "unique": true
    },
    "password": String
});

let User; // to be defined on new connection (see initialize)

////////////////////////////////////////////////////////////////////////////////
// FUNCTION: CONNECT TO MONGODB
////////////////////////////////////////////////////////////////////////////////
module.exports.initialize = function () {
    return new Promise(function (resolve, reject) {
        let db = mongoose.createConnection("mongodb://amann:chelsea@ds131621.mlab.com:31621/web322-a7");

        db.on('error', (err) => {
            reject(err); // reject the promise with the provided error
        });
        db.once('open', () => {
            User = db.model("users", userSchema);
            resolve();
        });
    });
};
////////////////////////////////////////////////////////////////////////////////
// FUNCTION: REGISTER USER
////////////////////////////////////////////////////////////////////////////////
module.exports.registerUser = function (userData) {
    return new Promise(function (resolve, reject) {
        if (userData.password != userData.password2) {
            reject("Passwords do not match");
        } else {
            bcrypt.genSalt(10, function (err, salt) { // Generate a "salt" using 10 rounds
                bcrypt.hash(userData.password, salt, function (err, hash) { // encrypt the password: "myPassword123"
                    if (err) {
                        reject("There was an error encrypting the password");
                    } else {
                        userData.password = hash;
                        let newUser = new User(userData); // create a new user
                        newUser.save((err) => {
                            if (err) {
                                if (err.code === 11000) {
                                    reject("User Name already taken");
                                } else {
                                    reject("There was an error creating the user: " + err);
                                }
                            } else {
                                console.log("User saved as '" + userData.user + "'");
                                resolve();
                            }
                        }) // end .save
                    }
                }); // end .hash
            }); // end .genSalt
        }
    }); // end promise
};
////////////////////////////////////////////////////////////////////////////////
// FUNCTION: CHECK USER
////////////////////////////////////////////////////////////////////////////////
module.exports.checkUser = function (userData) {
    return new Promise(function (resolve, reject) {
        User.find({ user: userData.user })
            .exec()
            .then((data) => {
                if (!data) {
                    reject("Unable to find user: " + userData.user);
                }
                console.log("system: " + data[0].password + " / input: " + userData.password) // test
                bcrypt.compare(userData.password, data[0].password).then((res) => {
                    // res === true if it matches and res === false if it does not match
                    if (res === false) {
                        reject("Incorrect password for user: " + userData.user);
                    } else {
                        resolve();
                    }
                }); // end .compare
            }) // end .then
            .catch((err) => {
                reject("Unable to find user: " + userData.user);
            });
    }); // end promise
};
////////////////////////////////////////////////////////////////////////////////
// FUNCTION: UPDATE PASSWORD
////////////////////////////////////////////////////////////////////////////////
module.exports.updatePassword = function (userData) {
    return new Promise(function (resolve, reject) {
        if (userData.password != userData.password2) {
            reject("Passwords do not match");
        } else {
            bcrypt.genSalt(10, function (err, salt) { // Generate a "salt" using 10 rounds
                bcrypt.hash(userData.password, salt, function (err, hash) { // encrypt the password: "myPassword123"
                    if (err) {
                        reject("There was an error encrypting the password");
                    } else {
                        User.update({ user: userData.user },
                            { $set: { password: hash } },
                            { multi: false })
                            .exec()
                            .then(resolve())
                            .catch(
                                reject("There was an error updating the password for " + userData.user)
                            );
                    }
                }); // end .hash
            }); // end .genSalt
        }
    }); // end promise
};