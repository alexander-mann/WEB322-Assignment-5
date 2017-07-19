// create comment schema
const mongoose = require('mongoose');
let Schema = mongoose.Schema;
var commentSchema = new Schema({
    "authorName": String,
    "authorEmail": String,
    "subject": String,
    "commentText": String,
    "postedDate": Date,
    "replies": [{ "comment_id": String, "authorName": String, "authorEmail": String, "commentText": String, "repliedDate": Date }]
});

let Comment; // to be defined on new connection (see initialize)

////////////////////////////////////////////////////////////////////////////////
// FUNCTION: CONNECT TO MONGODB
////////////////////////////////////////////////////////////////////////////////
module.exports.initialize = function () {
    return new Promise(function (resolve, reject) {
        let db = mongoose.createConnection("mongodb://amann:seneca@ds161162.mlab.com:61162/amann9_web322_a6");

        db.on('error', (err) => {
            reject(err); // reject the promise with the provided error
        });
        db.once('open', () => {
            Comment = db.model("comments", commentSchema);
            resolve();
        });
    });
};
////////////////////////////////////////////////////////////////////////////////
// FUNCTION: CREATE A NEW COMMENT
////////////////////////////////////////////////////////////////////////////////
module.exports.addComment = function (data) {
    return new Promise(function (resolve, reject) {
        data.postedDate = Date.now(); // set to current date/time
        let newComment = new Comment(data); // create a new comment

        newComment.save((err) => {
            if (err) {
                reject("There was an error saving the comment: " + err);
            } else {
                resolve("Comment saved as " + newComment._id);
            }
        });
    });
};
////////////////////////////////////////////////////////////////////////////////
// FUNCTION: GET ALL COMMENTS
////////////////////////////////////////////////////////////////////////////////
module.exports.getAllComments = function () {
    return new Promise(function (resolve, reject) {
        Comment.find()
            .exec()
            .then((data) => {
                console.log(data); // error checking
                resolve(data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};
////////////////////////////////////////////////////////////////////////////////
// FUNCTION: CREATE A NEW REPLY
////////////////////////////////////////////////////////////////////////////////
module.exports.addReply = function (data) {
    return new Promise(function (resolve, reject) {
        data.repliedData = Date.now(); // set to current date/time

        Comment.update({ comment_id: data.comment_id }),
            { $addToSet: { replies: data } },
            ({ multi: false })
                .exec()
                .then((data) => {
                    console.log(data); // error checking
                    resolve();
                })
                .catch((err) => {
                    reject(err);
                });
    });
};