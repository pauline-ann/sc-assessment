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

function printAllNodes(tree: TreeNode, depth: number) {
  if (depth === 0) {
    console.log(`root, with depth index ${depth}`, tree);
  }

  if (tree.descendants.length) {
    depth += 1;
    for (let descendant of tree.descendants) {
      console.log(`descendant, with depth index ${depth}`, descendant);
      printAllNodes(descendant, depth);
    }
  }
}


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

  findLowestEmployee(tree);

  printAllNodes(tree, 0)
}

main(data);
