/*********************************************************************************
* WEB322 – Assignment 06
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Alexander Mann Student ID: 131-632-168 Date: July 7, 2017
*
* Online (Heroku) Link: https://amann9-project.herokuapp.com/
*
********************************************************************************/

var express = require("express");
var path = require("path");
const dataService = require("./data-service.js"); // link data-service.js
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const dataServiceComments = require("./data-service-comments.js"); // link to data-service-comments.js
var app = express();

var HTTP_PORT = process.env.PORT || 8080;

// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

// used for css implimentation - to be discussed in class at later date
app.use(express.static('public'));

// ensure bodyParse middleware will work correctly & allow .hbs handling
app.use(bodyParser.urlencoded({ extended: true }));
app.engine(".hbs", exphbs({
  extname: ".hbs",
  defaultLayout: 'layout',
  helpers: {
    equal: function (lvalue, rvalue, options) {
      if (arguments.length < 3)
        throw new Error("Handlebars Helper equal needs 2 parameters");
      if (lvalue != rvalue) {
        return options.inverse(this);
      } else {
        return options.fn(this);
      }
    }
  }
}));
app.set("view engine", ".hbs");

////////////////////////////////////////////////////////////////////////////////
// HOME
////////////////////////////////////////////////////////////////////////////////

// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", function (req, res) {
  res.render("home");
});

////////////////////////////////////////////////////////////////////////////////
// ABOUT
////////////////////////////////////////////////////////////////////////////////

// setup another route to listen on /about
app.get("/about", function (req, res) {
  dataServiceComments.getAllComments()
    .then((data) => {
      res.render("about", { data: dataFromPromise });
    })
    .catch((err) => {
      res.render("about");
    })
});

////////////////////////////////////////////////////////////////////////////////
// GET EMPLOYEES BY STATUS / MANAGER / DEPARTMENT / ALL EMPLOYEES
////////////////////////////////////////////////////////////////////////////////

// set up route to /employees - populate employee data
app.get("/employees", (req, res) => {
  if (req.query.status) {
    console.log("-getEmployeesByStatus called"); // test //
    dataService.getEmployeesByStatus(req.query.status)
      .then((data) => {
        console.log("-getEmployeesByStatus resolved"); // test //
        res.render("employeeList", { data: data, title: "Employees" });
      })
      .catch((err) => {
        res.render("employeeList", { data: {}, title: "Employees" });
        console.log(err);
        console.log("-getEmployeesByStatus rejected"); // test //
      });
  } else if (req.query.manager) {
    console.log("-getEmployeesByManager called"); // test //
    dataService.getEmployeesByManager(req.query.manager)
      .then((data) => {
        console.log("-getEmployeesByManager resolved"); // test //
        res.render("employeeList", { data: data, title: "Employees" });
      })
      .catch((err) => {
        res.render("employeeList", { data: {}, title: "Employees" });
        console.log(err);
        console.log("-getEmployeesByManager rejected"); // test //
      });
  } else if (req.query.department) {
    console.log("-getEmployeesByDepartment called"); // test //
    dataService.getEmployeesByDepartment(req.query.department)
      .then((data) => {
        console.log("-getEmployeesByDepartment resolved"); // test //
        res.render("employeeList", { data: data, title: "Employees" });
      })
      .catch((err) => {
        res.render("employeeList", { data: {}, title: "Employees" });
        console.log(err);
        console.log("-getEmployeesByDepartment rejected"); // test //
      });
  } else {
    console.log("-getAllEmployees called"); // test //
    dataService.getAllEmployees()
      .then((data) => {
        console.log("-getAllEmployees resolved"); // test //
        res.render("employeeList", { data: data, title: "Employees" });
      })
      .catch((err) => {
        res.render("employeeList", { data: {}, title: "Employees" });
        console.log(err);
        console.log("-getAllEmployees rejected"); // test //
      });
  }
});

////////////////////////////////////////////////////////////////////////////////
// GET EMPLOYEE BY NUMBER
////////////////////////////////////////////////////////////////////////////////

// setup route to /employee/value
app.get("/employee/:empNum", (req, res) => {

  // initialize an empty object to store the values
  let viewData = {};

  dataService.getEmployeeByNum(req.params.empNum)
    .then((data) => {
      viewData.data = data; //store employee data in the "viewData" object as "data"
    }).catch(() => {
      viewData.data = null; // set employee to null if there was an error
    }).then(dataService.getDepartments)
    .then((data) => {
      viewData.departments = data; // store department data in the "viewData" object as "departments"

      // loop through viewData.departments and once we have found the departmentId that matches
      // the employee's "department" value, add a "selected" property to the matching
      // viewData.departments object

      for (let i = 0; i < viewData.departments.length; i++) {
        if (viewData.departments[i].departmentId == viewData.data.department) {
          viewData.departments[i].selected = true;
        }
      }

    }).catch(() => {
      viewData.departments = []; // set departments to empty if there was an error
    }).then(() => {
      if (viewData.data == null) { // if no employee - return an error
        res.status(404).send("Employee Not Found");
      } else {
        res.render("employee", { viewData: viewData }); // render the "employee" view
      }
    });
});

////////////////////////////////////////////////////////////////////////////////
// UPDATE EMPLOYEE
////////////////////////////////////////////////////////////////////////////////

// setup route to post /employee/update
app.post("/employee/update", (req, res) => {
  console.log(req.body);
  console.log("-updateEmployee resolved"); // test //
  dataService.updateEmployee(req.body)
    .then(res.redirect("/employees"));
});

////////////////////////////////////////////////////////////////////////////////
// GET MANANGERS
////////////////////////////////////////////////////////////////////////////////

// setup route to /managers
app.get("/managers", (req, res) => {
  console.log("-getManagers called"); // test //
  dataService.getManagers()
    .then((data) => {
      console.log("-getManagers resolved"); // test //
      res.render("employeeList", { data: data, title: "Employees (Managers)" });
    })
    .catch((err) => {
      res.render("employeeList", { data: {}, title: "Employees (Managers)" });
      console.log(err);
      console.log("-getManagers rejected"); // test //
    });
});

////////////////////////////////////////////////////////////////////////////////
// GET DEPARTMENTS
////////////////////////////////////////////////////////////////////////////////

// setup route to /departments
app.get("/departments", (req, res) => {
  console.log("-getDepartments called"); // test //
  dataService.getDepartments()
    .then((data) => {
      console.log("-getDepartments resolved"); // test //
      res.render("departmentList", { data: data, title: "Departments" });
    })
    .catch((err) => {
      res.render("departmentList", { data: {}, title: "Departments" });
      console.log(err);
      console.log("-getDepartments rejected"); // test //
    });
});

////////////////////////////////////////////////////////////////////////////////
// ADD EMPLOYEE
////////////////////////////////////////////////////////////////////////////////

// setup route to /employees/add
app.get("/employees/add", (req, res) => {
  console.log("-addEmployee called"); // test //
  dataService.getDepartments()
    .then((data) => {
      console.log("-addEmployee resolved"); // test //
      res.render("addEmployee", { departments: data });
    })
    .catch((err) => {
      res.render("addEmployee", { departments: [] });
      console.log(err);
      console.log("-addEmployee rejected"); // test //
    });
});

// setup route to post new employee
app.post("/employees/add", (req, res) => {
  console.log(req.body);
  dataService.addEmployee(req.body)
    .then(res.redirect("/employees"));
});

////////////////////////////////////////////////////////////////////////////////
// ADD DEPARTMENT
////////////////////////////////////////////////////////////////////////////////

// setup route to /departments/add
app.get("/departments/add", (req, res) => {
  console.log("-addDepartment called"); // test //
  res.render("addDepartment");
});

// setup route to post new department
app.post("/departments/add", (req, res) => {
  console.log(req.body);
  dataService.addDepartment(req.body)
    .then(res.redirect("/departments"));
});

////////////////////////////////////////////////////////////////////////////////
// UPDATE DEPARTMENT
////////////////////////////////////////////////////////////////////////////////

// setup route to post /department/update
app.post("/department/update", (req, res) => {
  console.log(req.body);
  console.log("-updateDepartment resolved"); // test //
  dataService.updateDepartment(req.body)
    .then(res.redirect("/department"));
});

////////////////////////////////////////////////////////////////////////////////
// GET DEPARTMENT BY ID
////////////////////////////////////////////////////////////////////////////////

// setup route to /department/value
app.get("/department/:dptId", (req, res) => {
  console.log("-getDepartmentById called"); // test //
  dataService.getDepartmentById(req.params.dptId)
    .then((data) => {
      console.log("-getDepartmentById resolved"); // test //
      res.render("department", { data: data });
    })
    .catch((err) => {
      res.status(404).send("Department Not Found");
      console.log(err);
      console.log("-getDepartmentById rejected"); // test //
    });
});

////////////////////////////////////////////////////////////////////////////////
// DELETE EMPLOYEE BY NUMBER
////////////////////////////////////////////////////////////////////////////////

app.get("/employee/delete/:empNum", (req, res) => {
  console.log("-deleteEmployeeByNum called"); // test //
  dataService.deleteEmployeeByNum(req.params.empNum)
    .then((data) => {
      console.log("-deleteEmployeeByNum resolved"); // test //
      res.redirect("/employees"); // redirect to allEmployees
    })
    .catch((err) => {
      res.status(500).send("Unable to Remove Employee / Employee Not Found");
      console.log(err);
      console.log("-deleteEmployeeByNum rejected"); // test //
    });
});

// setup route to 'no matching route'
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

////////////////////////////////////////////////////////////////////////////////
// ADD COMMENT
////////////////////////////////////////////////////////////////////////////////

// setup route to post /about/addComment
app.post("/about/addComment", (req, res) => {
  console.log("-addComment resolved"); // test //
  dataServiceComments.addComment(req.body)
    .then(res.redirect("/about"))
    .catch((err) => {
      console.log(err);
      res.redirect("/about");
    });
});
////////////////////////////////////////////////////////////////////////////////
// ADD REPLY
////////////////////////////////////////////////////////////////////////////////

// setup route to post /about/addReply
app.post("/about/addReply", (req, res) => {
  console.log("-addReply resolved"); // test //
  dataServiceComments.addReply(req.body)
    .then(res.redirect("/about"))
    .catch((err) => {
      console.log(err);
      res.redirect("/about");
    });
});
////////////////////////////////////////////////////////////////////////////////
// INITIALIZATION
////////////////////////////////////////////////////////////////////////////////

// setup http server to listen on HTTP_PORT
dataService.initialize()
  .then(dataServiceComments.initialize())
    .then(() => {
      console.log("-initialization successful"); // test //
      app.listen(HTTP_PORT, onHttpStart);
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
      console.log("-initialization failed"); // test //
    });