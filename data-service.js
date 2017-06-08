////////////////////////////////////////////////////////////////////////////////
// ARRAYS FOR DATA STORAGE
var employees = [];
var departments = [];
////////////////////////////////////////////////////////////////////////////////
// INCLUDE FS - FILE SYSTEM
const fs = require('fs');
////////////////////////////////////////////////////////////////////////////////
// FUNCTION: POPULATE DATA INTO GLOBAL ARRAYS
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
// FUNCTION: GET ALL EMPLOYEES
module.exports.getAllEmployees = () => {
    // console.log("Length: " + employees.length) // = 280
    // console.log(employees); // test
    return new Promise((resolve, reject) => {
        // console.log("Length: " + employees.length) // = 280
        if(employees.length == 0) {
            reject("No Employee Data Found");
        }
        else {
            console.log("Array length: " + employees.length) // = 0
            // console.log(employees); // test
            resolve(employees);
        }
    });
};
////////////////////////////////////////////////////////////////////////////////
// FUNCTION: GET ALL EMPLOYEES BY STATUS
module.exports.getEmployeesByStatus = (status) => {
    var empStatus = []; // temp array to hold results
    console.log(empStatus.length); // test
    for(let i = 0; i < employees.length; i++) {
        if(employees[i].status == status) {
            empStatus.push(employees[i]);
        }
    }
    return new Promise((resolve, reject) => {
        if(empStatus.length == 0) {
            reject("No Matching Results Found");
        }
        else {
            console.log("Array length: " + empStatus.length); // test
            resolve(empStatus);
        }
    });
};
////////////////////////////////////////////////////////////////////////////////
// FUNCTION: GET ALL EMPLOYEES BY DEPARTMENT
module.exports.getEmployeesByDepartment = (department) => {
    var empDept = []; // temp array to hold results
    console.log(empDept.length); // test
    for(let i = 0; i < employees.length; i++) {
        if(employees[i].department == department) {
            empDept.push(employees[i]);
        }
    }
    return new Promise((resolve, reject) => {
        if(empDept.length == 0) {
            reject("No Matching Results Found");
        }
        else {
            console.log("Array length: " + empDept.length); // test
            resolve(empDept);
        }
    });
};
////////////////////////////////////////////////////////////////////////////////