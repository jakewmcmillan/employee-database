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
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log('Showing Departments:');
        console.table('Departments:', res);
        start();
    })
}

function viewRole() {
    var query = 'SELECT * FROM role';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log('Showing Role:');
        console.table('Role');
        start();
    })
};

function viewEmployee() {
    var query = 'SELECT * FROM employee';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log('Showing Employees:');
        console.table('Employees:', res);
        start();
    })
};

function addDepartment() {
    var query = 'SELECT * FROM department';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log('Adding Department:');
        console.table('New Department');
        start();
    })
};

function addRole() {
    var query = 'SELECT * FROM role';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log('Adding Role:');
        console.table('Role');
        start();
    })
};

function addEmployee() {
    var query = '';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log('Adding employee:');
        console.table('New Employee', res);
        start();
    })
};

function updateEmployee() {
    var query = '';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log('Updating Employee:');
        console.table('Updating Employee');
        start();
    })
};

function quit() {
    process.exit();
};