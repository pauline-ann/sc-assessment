import {
    generateCompanyStructure,
    hireEmployee,
    fireEmployee,
    promoteEmployee,
    demoteEmployee,
    TreeNode,
    employee
  } from "./manageEmployees";
  import { getBoss, getSubordinates, findLowestEmployee } from "./getEmployees";
  import data from "./employees.json";

// Main code goes here
function main(data: { employees: Array<employee> }) {
    let tree = generateCompanyStructure(data.employees);

}

main(data)