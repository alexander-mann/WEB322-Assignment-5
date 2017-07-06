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
        sequelize.sync()
            .then(() => {
                resolve("database synced");
            })
            .catch(() => {
                reject("unable to sync database");
            })
    });
};
////////////////////////////////////////////////////////////////////////////////
// FUNCTION: GET ALL EMPLOYEES
////////////////////////////////////////////////////////////////////////////////
module.exports.getAllEmployees = () => {
    return new Promise(function (resolve, reject) {
        Employee.findAll()
            .then((data) => {
                resolve(data);
            })
            .catch(() => {
                reject("no employee data found");
            })
    });
};
////////////////////////////////////////////////////////////////////////////////
// FUNCTION: GET ALL EMPLOYEES BY STATUS
////////////////////////////////////////////////////////////////////////////////
module.exports.getEmployeesByStatus = (status) => {
    return new Promise(function (resolve, reject) {
        Employee.findAll({
            where: {
                status: status
            }
        })
            .then((data) => {
                resolve(data);
            })
            .catch(() => {
                reject("no employees with matching status found")
            })
    });
};
////////////////////////////////////////////////////////////////////////////////
// FUNCTION: GET ALL EMPLOYEES BY DEPARTMENT
////////////////////////////////////////////////////////////////////////////////
module.exports.getEmployeesByDepartment = (department) => {
    return new Promise(function (resolve, reject) {
        Employee.findAll({
            where: {
                department: department
            }
        })
            .then((data) => {
                resolve(data);
            })
            .catch(() => {
                reject("no employees with matching department found")
            })
    });
};
////////////////////////////////////////////////////////////////////////////////
// FUNCTION: GET ALL EMPLOYEES BY MANAGER
////////////////////////////////////////////////////////////////////////////////
module.exports.getEmployeesByManager = (manager) => {
    return new Promise(function (resolve, reject) {
        Employee.findAll({
            where: {
                employeeManagerNum: manager
            }
        })
            .then((data) => {
                resolve(data);
            })
            .catch(() => {
                reject("no employees with that manager found")
            })
    });
};
////////////////////////////////////////////////////////////////////////////////
// FUNCTION: GET EMPLOYEE BY ID
////////////////////////////////////////////////////////////////////////////////
module.exports.getEmployeeByNum = (num) => {
    return new Promise(function (resolve, reject) {
        Employee.findAll({
            where: {
                employeeNum: num
            }
        })
            .then((data) => {
                resolve(data[0]); // there is only one result
            })
            .catch(() => {
                reject("no employees with that number found")
            })
    });
};
////////////////////////////////////////////////////////////////////////////////
// FUNCTION: GET MANAGERS
////////////////////////////////////////////////////////////////////////////////
module.exports.getManagers = () => {
    return new Promise(function (resolve, reject) {
        Employee.findAll({
            where: {
                isManager: true
            }
        })
            .then((data) => {
                resolve(data);
            })
            .catch(() => {
                reject("no managers found")
            })
    });
};
////////////////////////////////////////////////////////////////////////////////
// FUNCTION: GET ALL DEPARTMENTS
////////////////////////////////////////////////////////////////////////////////
module.exports.getDepartments = () => {
    return new Promise(function (resolve, reject) {
        Department.findAll()
            .then((data) => {
                resolve(data);
            })
            .catch(() => {
                reject("no department data found");
            })
    });
};
////////////////////////////////////////////////////////////////////////////////
// FUNCTION: ADD NEW EMPLOYEE
////////////////////////////////////////////////////////////////////////////////
module.exports.addEmployee = (employeeData) => {
    return new Promise(function (resolve, reject) {
        // ensure attribute is set properly
        employeeData.isManager = (employeeData.isManager) ? true : false;
        // ensure all empty attributes are set to null
        for (var prop in employeeData) {
            if (employeeData[prop] == "") {
                employeeData[prop] = null;
            }
        }
        Employee.create({
            employeeNum: employeeData.employeeNum,
            firstName: employeeData.firstName,
            last_name: employeeData.last_name,
            email: employeeData.email,
            SSN: employeeData.SSN,
            addressStreet: employeeData.addressStreet,
            addressCity: employeeData.addressCity,
            addressState: employeeData.addressState,
            addressPostal: employeeData.addressPostal,
            maritalStatus: employeeData.maritalStatus,
            isManager: employeeData.isManager,
            employeeManagerNum: employeeData.employeeManagerNum,
            status: employeeData.status,
            department: employeeData.department,
            hireDate: employeeData.hireDate
        })
            .then(() => {
                resolve();
            })
            .catch(() => {
                reject("unable to create employee")
            })
    });
};
////////////////////////////////////////////////////////////////////////////////
// FUNCTION: UPDATE EMPLOYEE INFORMATION
////////////////////////////////////////////////////////////////////////////////
module.exports.updateEmployee = (employeeData) => {
    return new Promise(function (resolve, reject) {
        // ensure attribute is set properly
        employeeData.isManager = (employeeData.isManager) ? true : false;
        // ensure all empty attributes are set to null
        for (var prop in employeeData) {
            if (employeeData[prop] == "") {
                employeeData[prop] = null;
            }
        }
        Employee.update({
            firstName: employeeData.firstName,
            last_name: employeeData.last_name,
            email: employeeData.email,
            SSN: employeeData.SSN,
            addressStreet: employeeData.addressStreet,
            addressCity: employeeData.addressCity,
            addressState: employeeData.addressState,
            addressPostal: employeeData.addressPostal,
            maritalStatus: employeeData.maritalStatus,
            isManager: employeeData.isManager,
            employeeManagerNum: employeeData.employeeManagerNum,
            status: employeeData.status,
            department: employeeData.department,
            hireDate: employeeData.hireDate
        }, {
                where: { employeeNum: employeeData.employeeNum }
            })
            .then(() => {
                resolve();
            })
            .catch(() => {
                reject("unable to update employee")
            })
    });
};
////////////////////////////////////////////////////////////////////////////////
// FUNCTION: ADD NEW DEPARTMENT
////////////////////////////////////////////////////////////////////////////////
module.exports.addDepartment = (departmentData) => {
    return new Promise(function (resolve, reject) {
        // ensure all empty attributes are set to null
        for (var prop in departmentData) {
            if (departmentData[prop] == "") {
                departmentData[prop] = null;
            }
        }
        Department.create({
            departmentId: departmentData.departmentId,
            departmentName: departmentData.departmentName
        })
            .then(() => {
                resolve();
            })
            .catch(() => {
                reject("unable to create department")
            })
    });
};
////////////////////////////////////////////////////////////////////////////////
// FUNCTION: UPDATE DEPARTMENT
////////////////////////////////////////////////////////////////////////////////
module.exports.updateDepartment = (departmentData) => {
    return new Promise(function (resolve, reject) {
        // ensure all empty attributes are set to null
        for (var prop in departmentData) {
            if (departmentData[prop] == "") {
                departmentData[prop] = null;
            }
        }
        Department.update({
            departmentName: departmentData.departmentName
        }, {
                where: { departmentId: departmentData.departmentId }
            })
            .then(() => {
                resolve();
            })
            .catch(() => {
                reject("unable to update department")
            })
    });
};
////////////////////////////////////////////////////////////////////////////////
// FUNCTION: GET DEPARTMENT BY ID
////////////////////////////////////////////////////////////////////////////////
module.exports.getDepartmentById = (id) => {
    return new Promise(function (resolve, reject) {
        Department.findAll({
            where: {
                departmentId: id
            }
        })
            .then((data) => {
                resolve(data[0]); // there is only one result
            })
            .catch(() => {
                reject("no department with that id found")
            })
    });
};
////////////////////////////////////////////////////////////////////////////////