const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
// const Connection = require('mysql2/typings/mysql/lib/Connection');
const { quiet } = require('nodemon/lib/utils');
const consoleTable = require('console.table');
// const Connection = require('mysql2/typings/mysql/lib/Connection');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_db'
    },
    console.log('Connected to the employee_db database.')
)

db.connect(function(err){
    if (err) throw err;
    start();
})

function start () {
    inquirer.prompt ([
        {
            name: 'menu',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'Add Employees',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
                'Quit',
            ]
        }
    ])
    .then((answers) => {
        const { choices } = answers;

        if (choices === 'View All Employees') {
            viewEmployee();
        }
        if (choices === 'Add Employees') {
            addEmployee();
        }
        if (choices === 'Update Employee Role') {
            updateEmployee();
        }
        if (choices === 'View All Roles') {
            viewRole();
        }
        if (choices === 'Add Role') {
            addRole();
        }
        if (choices === 'View All Departments') {
            viewDepartment();
        }
        if (choices === 'Add Departments') {
            addDepartment();
        }
        if (choices === 'Quit') {
            quit();
        };
    });
};

function viewDepartment() {
    var query = 'SELECT * FROM department';
    db.query(query, function(err, res) {
        if (err) throw err;
        console.table('Departments:', res);
        start();
    })
}

function viewRole() {
    var query = 'SELECT * FROM role';
    db.query(query, function(err, res) {
        if (err) throw err;
        console.table('Roles:');
        start();
    })
};

function viewEmployee() {
    var query = 'SELECT * FROM employee';
    db.query(query, function(err, res) {
        if (err) throw err;
        console.table('Employees:', res);
        start();
    })
};

function addDepartment() {
    inquirer.prompt([
        {
            name: 'department',
            type: 'input',
            message: 'What is the name of the department?'
        }
    ]).then(function (answer) {
        db.query('INSERT INTO department SET ?')
        {
            name: answer.department
        }
    });
    var query = 'SELECT * FROM department';
    db.query(query, function(err, res) {
        if (err) throw err;
        console.table('Departments:', res);
        start();
    })
};

function addRole() {
    db.query('SELECT * FROM role', function(err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: 'role',
                type: 'input',
                message: 'What is the name of the role?'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary of the role?'
            },
            {
                name: 'department',
                type: 'list',
                message: 'Which department does this role belong to?',
                choices: function() {
                    var department = [];
                    for (let i = 0; i < res.length; i++) {
                        department.push(res[i].name);
                    }
                    return department;
                },
            }
        ])
        console.table('Role');
        start();
    })
};

function addEmployee() {
    db.query('SELECT * FROM role', function(err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: 'first_name',
                type: 'input',
                message: "What is the employee's first name?"
            },
            {
                name: 'last_name',
                type: 'input',
                message: "What is the employee's last name?"
            },
            {
                name: 'role',
                type: 'list',
                message: "What is the employee's role?",
                choices: ["Accountant", "Analyst", "Financing", "Representative", "Engineer"]
            }
        ])
        db.query(
            {
                first_name: answer.first_name,
                last_name: answer.last_name,
                role_id: answer.role_id,
                manager_id: answer.manager_id,
            }
        )
        console.table('New Employee', res);
        start();
    })
};

function updateEmployee() {
    db.query(query, function(err, res) {
        if (err) throw err;
        console.table('Updating Employee');
        start();
    })
};

function quit() {
    process.exit();
};