const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employees_db'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Employee database connected.");
    //Utilized https://patorjk.com/software/taag/#p=display&f=Shadow&t=Employee%20Tracker with "Shadow Font" to generate ASCII Art
    console.log(`
    
    ____|                    |                               __ __|                  |                
    __|    __ \`__ \\   __ \\   |   _ \\   |   |   _ \\   _ \\        |   __|  _\` |   __|  |  /   _ \\   __| 
    |      |   |   |  |   |  |  (   |  |   |   __/   __/        |  |    (   |  (       <    __/  |    
   _____| _|  _|  _|  .__/  _| \\___/  \\__, | \\___| \\___|       _| _|   \\__,_| \\___| _|\_\\ \\___| _|    
                     _|               ____/                                                           
    
    `);
    promptUser();
});


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
            viewAllEmployees();
            console.log("View All Employees");
        }

        if (choices === "Add Employee") {
            addEmployee();
            console.log("Add Employee");
        }

        if (choices === "Update Employee Role") {
            updateEmployeeRole();
            console.log("Update Employee Role");
        }

        if (choices === "View All Roles") {
            viewAllRoles();
            console.log("View All Roles");
        }

        if (choices === "Add Role") {
            addRole();
            console.log("Add Role");
        }

        if (choices === "View All Departments") {
            viewAllDepartments();
            console.log("View All Departments");
        }

        if (choices === "Add Department") {
            addDepartment();
            console.log("Add Department");
        }

        if (choices === "Quit") {
            connection.end();
            console.log("Quit")
        };

    });
};

//Function to view all employees
function viewAllEmployees() {
    var query = `Select * from employee`

    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        promptUser();
    })
};

//Function to add employee
function addEmployee() {

};

//function to update employee role
function updateEmployeeRole() {

};

//function to view all roles
function viewAllRoles() {

};

//function add role
function addRole() {

};

//function to view all departments
function viewAllDepartments() {

};

//function add department
function addDepartment() {

};