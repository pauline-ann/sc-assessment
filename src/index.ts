import {
  generateCompanyStructure,
  hireEmployee,
  fireEmployee,
  promoteEmployee,
  demoteEmployee,
  TreeNode,
  employee,
} from "./manageEmployees";
import { getBoss, getSubordinates, findLowestEmployee } from "./getEmployees";
import data from "./employees.json";



// Main code goes here
function main(data: { employees: Array<employee> }) {
  let tree = generateCompanyStructure(data.employees);

  let newEmployee = {
    name: "Jeb",
    jobTitle: "Snack Consumption Expert",
    boss: "Sarah",
    salary: "0",
  };

  hireEmployee(tree, newEmployee, "Sarah");

  fireEmployee(tree, "Alicia");

  promoteEmployee(tree, "Jared");

  demoteEmployee(tree, "Xavier", "Maria");

  getBoss(tree, "Bill");

  getSubordinates(tree, "Maria");
}

main(data);
