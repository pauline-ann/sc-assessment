interface employee {
  name: string;
  jobTitle: string;
  boss: string | null;
  salary: string;
}

interface IHash {
  [name: string]: TreeNode;
}

class TreeNode {
  value: employee;
  descendants: Array<TreeNode>;

  constructor(v: employee) {
    this.value = v;
    this.descendants = [];
  }
}

// Normalizes the provided JSON file
function normalizeJSON(employees: Array<employee>): void {
  console.log("Normalizing JSON file...");

  // Takes name from email and capitalizes string
  employees.forEach((employee: { name: string }) => {
    if (employee.name.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      let newValue: string =
        employee.name.charAt(0).toUpperCase() +
        employee.name.substring(1, employee.name.lastIndexOf("@"));
      employee.name = newValue;
    }
  });
}

/**
 * Normalizes the provided JSON file and generates a tree of employees.
 * 
 * @param {Object[]} employees array of employees
 * @returns {TreeNode}
 */
 function generateCompanyStructure(employees: Array<employee>): TreeNode {
  normalizeJSON(employees);

  // Generate a tree of employees
  console.log("Generating employee tree...");

  let tree = ((data: Array<employee>): TreeNode => {
    var t: IHash = {};
    var root: string = "";
    data.forEach((employee: employee) => {
      t[employee.name] = new TreeNode(employee);
      if (employee.boss === null) {
        root = employee.name;
      } else {
        t[employee.boss].descendants.push(t[employee.name]);
      }
    });
    return t[root];
  })(employees);
  // return generated tree
  return tree;
}

/**
 * Adds a new employee to the team and places them under a specified boss.
 * 
 * @param {TreeNode} tree
 * @param {Object} newEmployee
 * @param {string} bossName
 * @returns {void}
 */
 function hireEmployee(
  tree: TreeNode,
  newEmployee: employee,
  bossName: string
): void {
  // Boss found in tree
  if (tree.value.name === bossName) {
    let newEmployeeNode: TreeNode = new TreeNode(newEmployee);
    tree.descendants.push(newEmployeeNode);

    console.log(
      `[hireEmployee]: Added new employee (${newEmployee.name}) with ${bossName} as their boss`
    );
  }

  // Recursively call function on descendants
  if (tree.descendants.length) {
    for (let descendant of tree.descendants) {
      hireEmployee(descendant, newEmployee, bossName);
    }
  }
}

/**
 * Removes an employee from the team by name. 
 * If the employee has other employees below them, randomly selects one to take their place.
 * 
 * @param {TreeNode} tree
 * @param {string} name employee's name
 * @returns {void}
 */
function fireEmployee() {

}

/**
 * Promotes an employee one level above their current ranking. 
 * The promoted employee and their boss should swap places in the hierarchy.
 * 
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {void}
 */
function promoteEmployee() {

}

/**
 * Demotes an employee one level below their current ranking.
 * Picks a subordinat and swaps places in the hierarchy.
 * 
 * @param {TreeNode} tree
 * @param {string} employeeName the employee getting demoted
 * @param {string} subordinateName the new boss
 * @returns {void}
 */
function demoteEmployee() {

}

export {
  employee,
  TreeNode,
  generateCompanyStructure,
  hireEmployee,
  fireEmployee,
  promoteEmployee,
  demoteEmployee,
};
