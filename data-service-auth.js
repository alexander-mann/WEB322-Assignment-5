// create user schema
const mongoose = require('mongoose');
let Schema = mongoose.Schema;
var userSchema = new Schema({
    "user":  {
    "type": String,
    "unique": true
  },
    "password" : String
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

