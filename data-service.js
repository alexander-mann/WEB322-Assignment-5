var employees = [];
var departments = [];

const fs = require('fs');

module.exports.initialize = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./data/employees.json', (err, data) => {
            if(err) {
                reject("Initialization Error - Employee Data");
            }
            else {
                employees = JSON.parse(data);
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

