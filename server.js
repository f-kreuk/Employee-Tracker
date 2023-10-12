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
//COALESCE function below will display "" if the value is null
//left joins are used to join the employee table with the role and department tables, as well as the employee table itself
function viewAllEmployees() {
    var query = `
    SELECT 
        employee.id AS Id,
        employee.first_name AS 'First Name',
        employee.last_name AS 'Last Name',
        COALESCE(role.title, '') AS Role,
        COALESCE(role.salary, '') AS Salary,
        COALESCE(department.name, '') AS Department,
        COALESCE(CONCAT(manager.first_name,' ',manager.last_name), '') AS Manager
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id;`

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
    var query = `
    SELECT 
        role.id AS Id,
        role.title AS 'Title',
        role.salary AS 'Salary',
        COALESCE(department.name, '') AS Department
    FROM role
    LEFT JOIN department ON role.department_id = department.id;`

    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        promptUser();
    })
};   

//function add role
function addRole() {

    //here we are getting a list of the departments
    connection.query("SELECT id, name FROM department", function (err, res) {
        if (err) throw err;

        const departmentChoices = res.map((department) => department.name);

    inquirer.prompt([
        {
        type: "input",
        name: "title",
        message: "What is the title for the new role?"
        },
        {
        type: "input",
        name: "salary",
        message: "What is the salary for the new role?"
        },
        {
        type: "list", //here we are inputting the departments from our query as the choices
        name: "department",
        message: "What department are you adding this role to?",
        choices: departmentChoices
        },
    ])
    .then(function (answer) {
        var query = `INSERT INTO role SET ?`

        connection.query(query, {
            title: answer.title,
            salary: answer.salary,
            department_id: answer.department_id
        },
        function (err, res) {
            if (err) throw err;
            console.log("Role added!");
            promptUser();
        });
    });
    });
};

//function to view all departments
function viewAllDepartments() {
    var query = `
    SELECT
        department.id as Id,
        department.name as Department
    FROM department;`

    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        promptUser();
    })
};

//function to add department
function addDepartment() {
    //using inquirer to prompt user for the new department name
    inquirer.prompt([
        {
        type: "input",
        name: "departmentName",
        message: "What is the name of the new department?"
        },
    ])
    .then(function (answer) {
        var query = `INSERT INTO department SET ?`
        //use connection method to insert new department into department table
        connection.query(query, {
            name: answer.departmentName
        },
        function (err, res) {
            if (err) throw err;
            console.log("Department added!");
            promptUser();
        });
    });

};