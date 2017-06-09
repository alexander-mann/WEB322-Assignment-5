/*********************************************************************************
* WEB322 – Assignment 03
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Alexander Mann Student ID: 131-632-168 Date: May 23, 2017
*
* Online (Heroku) Link: https://amann9-assign3.herokuapp.com/
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
  if (req.query.status) {
    console.log("-getEmployeesByStatus called"); // test //
    dataService.getEmployeesByStatus(req.query.status)
      .then((data) => {
        console.log("-getEmployeesByStatus resolved"); // test //
        res.json(data);
      })
      .catch((err) => {
        console.log("-getEmployeesByStatus rejected"); // test //
        res.json(err);
        console.log(err);
      })
  } else if (req.query.manager) {
    console.log("-getEmployeesByManager called"); // test //
    dataService.getEmployeesByManager(req.query.manager)
      .then((data) => {
        console.log("-getEmployeesByManager resolved"); // test //
        res.json(data);
      })
      .catch((err) => {
        console.log("-getEmployeesByManager rejected"); // test //
        res.json(err);
        console.log(err);
      })
  } else if (req.query.department) {
    console.log("-getEmployeesByDepartment called"); // test //
    dataService.getEmployeesByDepartment(req.query.department)
      .then((data) => {
        console.log("-getEmployeesByDepartment resolved"); // test //
        res.json(data);
      })
      .catch((err) => {
        console.log("-getEmployeesByDepartment rejected"); // test //
        res.json(err);
        console.log(err);
      })
  } else {
    console.log("-getAllEmployees called"); // test //
    dataService.getAllEmployees()
      .then((data) => {
        console.log("-getAllEmployees resolved"); // test //
        res.json(data);
      })
      .catch((err) => {
        console.log("-getAllEmployees rejected"); // test //
        res.json(err);
        console.log(err);
      })
  }
});

// setup route to /employee/value
app.get("/employee/:empNum", (req, res) => {
  console.log("-getEmployeeByNum called"); // test //
  dataService.getEmployeeByNum(req.params.empNum)
    .then((data) => {
      console.log("-getEmployeeByNum resolved"); // test //
      res.json(data);
    })
    .catch((err) => {
      console.log("-getEmployeeByNum rejected"); // test //
      res.json(err);
      console.log(err);
    })
});

// setup route to /managers
app.get("/managers", (req, res) => {
    console.log("-getManagers called"); // test //
  dataService.getManagers()
    .then((data) => {
      console.log("-getManagers resolved"); // test //
      res.json(data);
    })
    .catch((err) => {
      console.log("-getManagers rejected"); // test //
      res.json(err);
      console.log(err);
    })
});

// setup route to /departments
app.get("/departments", (req, res) => {
  console.log("-getDepartments called"); // test //
  dataService.getDepartments()
    .then((data) => {
      console.log("-getDepartments resolved"); // test //
      res.json(data);
    })
    .catch((err) => {
      console.log("-getDepartments rejected"); // test //
      res.json(err);
      console.log(err);
    })
});

// setup route to 'no matching route'
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

// used for css implimentation - to be discussed in class at later date
app.use(express.static('public'));

// setup http server to listen on HTTP_PORT
dataService.initialize()
  .then((data) => {
    console.log("-initialization successful"); // test //
    app.listen(HTTP_PORT, onHttpStart);
  })
  .catch((err) => {
    console.log("-initialization failed"); // test //
    res.json(err);
    console.log(err);
  });

