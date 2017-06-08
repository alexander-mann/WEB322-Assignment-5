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
const dataService = require("./data-service.js"); // link data-service.js
var app = express();

var HTTP_PORT = process.env.PORT || 8080;

// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/views/home.html"));
});

// setup another route to listen on /about
app.get("/about", function (req, res) {
  res.sendFile(path.join(__dirname + "/views/about.html"));
});

// set up route to /employees - populate employee data
app.get("/employees", (req, res) => {
  dataService.getAllEmployees()
    .then((data) => {
      res.json(data);
      if (req.query.status) {
        dataService.getEmployeesByStatus(req.query.status)
          .then((data) => {
            res.json(data);
          })
          .catch((err) => {
            console.log(err);
          })
      } else if (req.query.manager) {
        res.json({ message: req.query.manager });
      } else if (req.query.department) {
        res.json({ message: req.query.department });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// setup route to /employee/value
app.get("/employee/:empNum", (req, res) => {
  res.json({ message: req.params.empNum });
});

// setup route to /managers
app.get("/managers", (req, res) => {
  if (req.query.manager) {
    res.json({ message: req.query.manager });
  }
});

// setup route to /departments
app.get("/departments", (req, res) => {
  if (req.query.department) {
    res.json({ message: req.query.manager })
  }
});

// setup route to 'no matching route'
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

// used for css implimentation - to be discussed in class at later date
app.use(express.static('public'));

// setup http server to listen on HTTP_PORT
dataService.initialize()
  .then(() => {
    app.listen(HTTP_PORT, onHttpStart);
  })
  .catch((err) => {
    console.log(err);
  });

