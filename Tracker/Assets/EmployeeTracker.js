const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    user: 'root',

    password: 'omsairam',
    database: 'employee_db'
});

connection.connect((err) => {
    if (err) throw err;
    viewer();
});

const viewer = () => {
    inquirer
    .prompt({
        name: 'main',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View All Employees',
            'View All Departments',
            'View All Roles',
            'Add Employee',
            'Add Role',
            'Add Department',
            'Update Employee Role',
        ],
    })
    .then(answer => {        
        switch(answer.main) {
        case 'View All Employees':
            console.log('this is working!')
            employeeAll();
            break;
        
        case 'View All Departments':
            departmentsAll();
            break;

        case 'View All Roles':
            rolesAll();
            break;

        case 'Add Employee':
            addEmployee();
            break;

        case 'Add Role':
            addRole();
            break;

        case 'Add Department':
            addDepartment();
            break;

        case 'Update Employee Role':
            updateRole();
            break;
        
        default:
            console.log(`Invalid choice: ` + answer);
            break;        
    }


    });
};

const employeeAll = () => {
    const query = 'SELECT e.first_name, e.last_name, d.dept_name, r.title ' + 
        'FROM employee AS e ' + 
        'JOIN employee_role AS r ON r.role_id = e.role_id ' +  
        'JOIN department AS d ON d.dept_id = r.dept_id';
    connection.query(query, (err,res) => {
        res.forEach(({first_name, last_name, dept_name, title}) => {
            console.table([
                {
                    Name: `${first_name} ${last_name}`,
                    Department: `${dept_name}`,
                    Title: `${title}`
                }
            ]
            )
        })
    })};

const departmentsAll = () => {
    const query ='SELECT dept_name FROM department';
    connection.query(query, (err, res) => {
        res.forEach(({dept_name}) => {
            console.table([
                {
                    Department: `${dept_name}`
                }
            ])
        }
    )})
};

const rolesAll = () => {
    const query = 'SELECT d.dept_name, r.title, r.salary ' + 
        'FROM employee_role AS r ' +  
        'JOIN department AS d ON d.dept_id = r.dept_id';
    connection.query(query, (err,res) => {
        res.forEach(({dept_name, title, salary}) => {
            console.table([
                {
                    Department: `${dept_name}`,
                    Title: `${title}`,
                    Salary: `${salary}`
                }
            ]
            )
        })
    })};


const addEmployee = () => {
    const query = 'SELECT title FROM employee_role'
    const questions = [
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
            name: 'title',
            type:'list',
            message:'Select the title of the employee.',
            choices: []   
        }
    ]
    inquirer
    .prompt(questions)
    .then(answers => {console.log(answers)})
}
