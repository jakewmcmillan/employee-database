USE employee_db;

INSERT INTO department (id, department_name)
VALUES 
    (1, 'Accounting'),
    (2, 'Data Analytics')
    (3, 'Finance'),
    (4, 'Human Resources'),
    (5, 'Information Technology');

INSERT INTO role (id, title, salary, department_id)
VALUES
    (1, 'Accountant', 100000, 1),
    (2, 'Analyst', 100000, 2),
    (3, 'Financing', 100000, 3),
    (4, 'Representative', 100000, 4),
    (5, 'Engineer', 100000, 5);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
    (1, 'Gideon', 'Jura', 1, 1),
    (2, 'Jace', 'Beleren', 2, 2),
    (3, 'Liliana', 'Vess', 3, 3),
    (4, 'Chandra', 'Nalaar', 4, 4),
    (5, 'Nissa', 'Revane', 5, 5);