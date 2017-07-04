////////////////////////////////////////////////////////////////////////////////
// ASSIGNMENT 5 ADD-ONS
////////////////////////////////////////////////////////////////////////////////
const Sequelize = require('sequelize');
// set up sequelize to point to our postgres database
var sequelize = new Sequelize('d7n3rptalm9ma1', 'nyvjasvfjikvpr', 'a7ca25cefdf39388d0ee2eb31a0f1bfd8810b531fd8404e7bead9ec39c3a7792', {
    host: 'ec2-184-73-249-56.compute-1.amazonaws.com',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: true
    }
});
// define Employee model
var Employee = sequelize.define('Employee', {
    employeeNum: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: Sequelize.STRING,
    last_name: Sequelize.STRING,
    email: Sequelize.STRING,
    SSN: Sequelize.STRING,
    addressStreet: Sequelize.STRING,
    addressCity: Sequelize.STRING,
    addressState: Sequelize.STRING,
    addressPostal: Sequelize.STRING,
    maritalStatus: Sequelize.STRING,
    isManager: Sequelize.BOOLEAN,
    employeeManagerNum: Sequelize.INTEGER,
    status: Sequelize.STRING,
    department: Sequelize.INTEGER,
    hireDate: Sequelize.STRING
})
// define Department model
var Department = sequelize.define('Department', {
    departmentId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    departmentName: Sequelize.STRING
})
////////////////////////////////////////////////////////////////////////////////
// FUNCTION: POPULATE DATA INTO GLOBAL ARRAYS
////////////////////////////////////////////////////////////////////////////////
module.exports.initialize = () => {
    return new Promise(function (resolve, reject) {
        reject();
    });
};
////////////////////////////////////////////////////////////////////////////////
// FUNCTION: GET ALL EMPLOYEES
////////////////////////////////////////////////////////////////////////////////
module.exports.getAllEmployees = () => {
    return new Promise(function (resolve, reject) {
        reject();
    });
};
////////////////////////////////////////////////////////////////////////////////
// FUNCTION: GET ALL EMPLOYEES BY STATUS
////////////////////////////////////////////////////////////////////////////////
module.exports.getEmployeesByStatus = (status) => {
    return new Promise(function (resolve, reject) {
        reject();
    });
};
////////////////////////////////////////////////////////////////////////////////
// FUNCTION: GET ALL EMPLOYEES BY DEPARTMENT
////////////////////////////////////////////////////////////////////////////////
module.exports.getEmployeesByDepartment = (department) => {
    return new Promise(function (resolve, reject) {
        reject();
    });
};
////////////////////////////////////////////////////////////////////////////////
// FUNCTION: GET ALL EMPLOYEES BY MANAGER
////////////////////////////////////////////////////////////////////////////////
module.exports.getEmployeesByManager = (manager) => {
    return new Promise(function (resolve, reject) {
        reject();
    });
};
////////////////////////////////////////////////////////////////////////////////
// FUNCTION: GET EMPLOYEE BY ID
////////////////////////////////////////////////////////////////////////////////
module.exports.getEmployeeByNum = (num) => {
    return new Promise(function (resolve, reject) {
        reject();
    });
};
////////////////////////////////////////////////////////////////////////////////
// FUNCTION: GET MANAGERS
////////////////////////////////////////////////////////////////////////////////
module.exports.getManagers = () => {
    return new Promise(function (resolve, reject) {
        reject();
    });
};
////////////////////////////////////////////////////////////////////////////////
// FUNCTION: GET ALL DEPARTMENTS
////////////////////////////////////////////////////////////////////////////////
module.exports.getDepartments = () => {
    return new Promise(function (resolve, reject) {
        reject();
    });
};
////////////////////////////////////////////////////////////////////////////////
// FUNCTION: ADD NEW EMPLOYEE
////////////////////////////////////////////////////////////////////////////////
module.exports.addEmployee = (employeeData) => {
    return new Promise(function (resolve, reject) {
        reject();
    });
};
////////////////////////////////////////////////////////////////////////////////
// FUNCTION: UPDATE EMPLOYEE INFORMATION
////////////////////////////////////////////////////////////////////////////////
module.exports.updateEmployee = (employeeData) => {
    return new Promise(function (resolve, reject) {
        reject();
    });
};
////////////////////////////////////////////////////////////////////////////////