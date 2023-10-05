const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');


//below is the basic prompt for the user
const promptUser = () => {
    return inquirer.prompt([
      {
        type: 'list',
        name: 'choices',
        message: 'What would you like to do?',
        choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "Add Department",
            "Add Role",
            "Add Employee",
            "Update Employee Role",
            "Quit"
        ]
      }
    ])

// depending on the selection made, various outcomes may occur
    .then((answers) => {
        const {choices} = answers;

        if (choices === "View All Employees") {
            console.log("View All Employees");
        }

        if (choices === "Add Employee") {
            console.log("Add Employee");
        }

        if (choices === "Update Employee Role") {
            console.log("Update Employee Role");
        }

        if (choices === "View All Roles") {
            console.log("View All Roles");
        }

        if (choices === "Add Role") {
            console.log("Add Role");
        }

        if (choices === "View All Departments") {
            console.log("View All Departments");
        }

        if (choices === "Add Department") {
            console.log("Add Department");
        }

        if (choices === "Quit") {
            console.log("Quit")
        };

    });
};

// function to initialize the app
const init = () => {
    promptUser()
};


// function call to initialize app
init();