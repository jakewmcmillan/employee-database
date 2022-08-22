const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const Connection = require('mysql2/typings/mysql/lib/Connection');
const { quiet } = require('nodemon/lib/utils');

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
);

function menu () {
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
            showEmployee();
        }
        if (choices === 'Add Employees') {
            addEmployee();
        }
        if (choices === 'Update Employee Role') {
            updateEmployeeRole();
        }
        if (choices === 'View All Roles') {
            showRole();
        }
        if (choices === 'Add Role') {
            addRole();
        }
        if (choices === 'View All Departments') {
            showDepartment();
        }
        if (choices === 'Add Departments') {
            addDepartment();
        }
        if (choices === 'Quit') {
            quit();
        };
    });
};

function showDepartment() {
    var query = 'SELECT * FROM department';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log('Showing Departments:');
        console.table('Departments:', res);
        menu();
    })
}

function showEmployee() {
    var query = 'SELECT * FROM employee';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log('Showing Employees:');
        console.table('Employees:', res);
        menu();
    })
};

function addEmployee() {
    var query = '';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log('Adding employee:');
        console.table('New Employee', res);
        menu();
    })
};

function updateEmployeeRole() {
    var query = '';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log('Updating Employee:');
        console.table('Updating Employee');
        menu();
    })
};

function showRole() {
    var query = 'SELECT * FROM role';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log('Showing Role:');
        console.table('Role');
        menu();
    })
};

function addRole() {
    var query = 'SELECT * FROM role';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log('Adding Role:');
        console.table('Role');
        menu();
    })
};

function addDepartment() {
    var query = 'SELECT * FROM department';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log('Adding Department:');
        console.table('New Department');
    })
};

function quit() {
    process.exit();
};