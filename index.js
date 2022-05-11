const inquirer = require('inquirer');
const Query = require('./lib/Query');

//Add employee
const employeePrompts = async (titles, managers) => {
    
    const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the employee's last name?"
        },
        {
            type: "list",
            name: "roleId",
            message: "What is the employee's role?",
            choices: titles
        },
        {
            type: "list",
            name: "managerId",
            message: "Who is the employee's manager?",
            choices: managers
        }
    ]);
    const query = new Query();
    query.addEmployee(firstName, lastName, roleId, managerId, startApplication);
};

// Add a new role
const rolePrompts = async (departments) => {
    const {title, salary, department} = await inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the name of the role?",
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary of the role?"
        },
        {
            type: "list",
            name: "department",
            message: "Which department does the role belong to?",
            choices: departments
        }
    ]);
    const query = new Query();
    query.addRole(title, salary, department, startApplication);
    
};

// Add a department
const departmentPrompts = (query, startApplication) => {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of the department?"
        }
    ]).then(({name}) => {
        query.addDepartment(name, startApplication);
    })
};

const updateRolePrompts = async (employees, titles) => {
    console.log(employees);
    const {employee, role} = await inquirer.prompt([
        {
            type: "list",
            name: "employee",
            message: "Which employee's role do you want to update?",
            choices: employees
        },
        {
            type: "list",
            name: "role",
            message: "Which role do you want to assign the selected employee?",
            choices: titles
        }
    ]);
    const query = new Query();
    query.updateEmployeeRole(role, employee, startApplication);
   
}

const startApplication = async () => {
   
   const { choice } = await inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                "Add Employee",
                "Update Employee Role",
                "View All Roles",
                "Add Role",
                "View All Departments",
                "Add Department",
                "View All Employees",
                "Quit"
            ]
        }
    ]);
    const query = new Query();
    if (choice === "Add Employee") {
        query.addEmployeeChoices(employeePrompts);
    } else if (choice === "Update Employee Role") {
        query.viewUpdateRoleChoices(updateRolePrompts);
    } else if (choice === "View All Roles") {
        query.viewAllRoles(startApplication);
    } else if (choice === "Add Role") {
        query.viewDepartmentChoices(rolePrompts);
    } else if (choice === "View All Departments") {
        query.viewDepartments(startApplication);
    } else if (choice === "Add Department") {
        departmentPrompts(query, startApplication);
    }
    else if (choice === "View All Employees") {
        query.viewAllEmployees(startApplication);
    }
    else {
        console.log("Have a nice day!");
        return;
    }
};

startApplication();
