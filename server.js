/*********************************************************************************
* WEB322 – Assignment 02
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Alexander Mann Student ID: 131-632-168 Date: May 23, 2017
*
* Online (Heroku) Link: https://amann9-assign2.herokuapp.com/
*
********************************************************************************/

var express = require("express");
var path = require("path");
var app = express();

var HTTP_PORT = process.env.PORT || 8080;

// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", function(req,res){
   res.sendFile(path.join(__dirname + "/views/home.html"));
});

// setup another route to listen on /about
app.get("/about", function(req,res){
   res.sendFile(path.join(__dirname + "/views/about.html"));
});

// used for css implimentation - to be discussed in class at later date
app.use(express.static('public'));

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);