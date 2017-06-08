////////////////////////////////////////////////////////////////////////////////
// ARRAYS FOR DATA STORAGE
var employees = [];
var departments = [];
////////////////////////////////////////////////////////////////////////////////
// INCLUDE FS - FILE SYSTEM
const fs = require('fs');
////////////////////////////////////////////////////////////////////////////////
// INITALIZE FUNCTION
module.exports.initialize = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./data/employees.json', (err, data) => {
            if(err) {
                reject("Initialization Error - Employee Data");
            }
            else {
                employees = JSON.parse(data);
                // console.log(employees); // test
                fs.readFile('./data/departments.json', (err, data) => {
                    if(err) {
                        reject("Initialization Error - Department Data");
                    }
                    else {
                        departments = JSON.parse(data);
                        resolve("Initialization Successful");
                    }
                });
            }
        });
    });
};
////////////////////////////////////////////////////////////////////////////////
// GET ALL EMPLOYEES FUNCTION
module.exports.getAllEmployees = () => {
    // console.log("Length: " + employees.length) // = 280
    // console.log(employees); // test
    return new Promise((resolve, reject) => {
        // console.log("Length: " + employees.length) // = 280
        if(employees.length == 0) {
            reject("No Employee Data Found");
        }
        else {
            // console.log("Length: " + employees.length) // = 0
            // console.log(employees); // test
            resolve(employees);
        }
    });
};
////////////////////////////////////////////////////////////////////////////////
// GET EMPLOYEES BY STATUS FUNCTION
module.exports.getEmployeesByStatus = (status) => {
    var empStatus = []; // temp array to hold results
    for(let i = 0; i < employees.length; i++) {
        if(employee[i].status = status) {
            empStatus += employee[i];
        }
    }
    return new Promise((resolve, reject) => {
        if(empStatus.length = 0) {
            reject("No Matching Results Found");
        }
        else {
            resolve();
            return empStatus;
        }
    });
};
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////