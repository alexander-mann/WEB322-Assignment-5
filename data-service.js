////////////////////////////////////////////////////////////////////////////////
// ARRAYS FOR DATA STORAGE
////////////////////////////////////////////////////////////////////////////////
var employees = [];
var departments = [];
var empCount = 0;
////////////////////////////////////////////////////////////////////////////////
// INCLUDE FS - FILE SYSTEM
////////////////////////////////////////////////////////////////////////////////
const fs = require('fs');
////////////////////////////////////////////////////////////////////////////////
// FUNCTION: POPULATE DATA INTO GLOBAL ARRAYS
////////////////////////////////////////////////////////////////////////////////
module.exports.initialize = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./data/employees.json', (err, data) => {
            if(err) {
                reject("Initialization Error - Employee Data");
            }
            else {
                employees = JSON.parse(data);
                // console.log(employees); // test
                empCount = employees.length; // set employee count
                fs.readFile('./data/departments.json', (err, data) => {
                    if(err) {
                        reject("Initialization Error - Department Data");
                    }
                    else {
                        departments = JSON.parse(data);
                        // console.log(departments); // test
                        resolve("Initialization Successful");
                    }
                });
            }
        });
    });
};
////////////////////////////////////////////////////////////////////////////////
// FUNCTION: GET ALL EMPLOYEES
////////////////////////////////////////////////////////////////////////////////
module.exports.getAllEmployees = () => {
    return new Promise((resolve, reject) => {
        if(employees.length === 0) {
            reject("No Employee Data Found");
        }
        else {
            console.log("All Employees = " + employees.length); // test
            resolve(employees);
        }
    });
};
////////////////////////////////////////////////////////////////////////////////
// FUNCTION: GET ALL EMPLOYEES BY STATUS
////////////////////////////////////////////////////////////////////////////////
module.exports.getEmployeesByStatus = (status) => {
    let empStatus = []; // temp array to hold results
    for(let i = 0; i < employees.length; i++) {
        if(employees[i].status == status) {
            empStatus.push(employees[i]);
        }
    }
    return new Promise((resolve, reject) => {
        if(empStatus.length === 0) {
            reject("No Matching Results Found");
        }
        else {
            console.log(status + " Employees = " + empStatus.length); // test
            resolve(empStatus);
        }
    });
};
////////////////////////////////////////////////////////////////////////////////
// FUNCTION: GET ALL EMPLOYEES BY DEPARTMENT
////////////////////////////////////////////////////////////////////////////////
module.exports.getEmployeesByDepartment = (department) => {
    let empDept = []; // temp array to hold results
    for(let i = 0; i < employees.length; i++) {
        if(employees[i].department == department) {
            empDept.push(employees[i]);
        }
    }
    return new Promise((resolve, reject) => {
        if(empDept.length === 0) {
            reject("No Matching Results Found");
        }
        else {
            console.log("Employees in Department " + department + " = " + empDept.length); // test
            resolve(empDept);
        }
    });
};
////////////////////////////////////////////////////////////////////////////////
// FUNCTION: GET ALL EMPLOYEES BY MANAGER
////////////////////////////////////////////////////////////////////////////////
module.exports.getEmployeesByManager = (manager) => {
    let empMngr = []; // temp array to hold results
    for(let i = 0; i < employees.length; i++) {
        if(employees[i].employeeManagerNum == manager) {
            empMngr.push(employees[i]);
        }
    }
    return new Promise((resolve, reject) => {
        if(empMngr.length === 0) {
            reject("No Matching Results Found");
        }
        else {
            console.log("Employees with Manager " + manager + " = " + empMngr.length); // test
            resolve(empMngr);
        }
    });
};
////////////////////////////////////////////////////////////////////////////////
// FUNCTION: GET EMPLOYEE BY ID
////////////////////////////////////////////////////////////////////////////////
module.exports.getEmployeeByNum = (num) => {
    let emp = []; // temp array to hold results
    for(let i = 0; i < employees.length; i++) {
        if(employees[i].employeeNum == num) {
            emp = employees[i];
        }
    }
    return new Promise((resolve, reject) => {
        if(emp.length === 0) {
            reject("No Employee with ID " + num + " Found");
        }
        else {
            console.log("Employee with ID " + num + " = " + emp.firstName + " " + emp.last_name); // test
            resolve(emp);
        }
    });
};
////////////////////////////////////////////////////////////////////////////////
// FUNCTION: GET MANAGERS
////////////////////////////////////////////////////////////////////////////////
module.exports.getManagers = () => {
    let mngrs = []; // temp array to hold results
    for(let i = 0; i < employees.length; i++) {
        if(employees[i].isManager === true) {
            mngrs.push(employees[i]);
        }
    }
    return new Promise((resolve, reject) => {
        if(mngrs.length === 0) {
            reject("No Managers Found");
        }
        else {
            console.log("All Managers = " + mngrs.length); // test
            resolve(mngrs);
        }
    });
};
////////////////////////////////////////////////////////////////////////////////
// FUNCTION: GET ALL DEPARTMENTS
////////////////////////////////////////////////////////////////////////////////
module.exports.getDepartments = () => {
    return new Promise((resolve, reject) => {
        if(departments.length === 0) {
            reject("No Department Data Found");
        }
        else {
            console.log("All Departments = " + departments.length); // test
            resolve(departments);
        }
    });
};
////////////////////////////////////////////////////////////////////////////////
// FUNCTION: ADD NEW EMPLOYEE
////////////////////////////////////////////////////////////////////////////////
module.exports.addEmployee = (employeeData) => {
    return new Promise((resolve, reject) => {
        // increment empCount
        empCount++;
        // assign employee number
        employees[employees.length].employeeNum = empCount;
        // console.log("Employee # " + employees[employees.length].employeeNum); // test
        // assign new employee to array
        employees[employees.length] = employeeData;
        // console.log(employees[employees.length]); // test
        if(employees[employees.length].employeeManagerNum != employeeData.employeeManagerNum) {
            reject("Employee Was Not Added Successfully");
        }
        else {
            resolve();
        }
    });
};
////////////////////////////////////////////////////////////////////////////////