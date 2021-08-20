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
function fireEmployee(tree: TreeNode, name: string): TreeNode {
  // If fired employee is found....
  if (tree.value.name === name) {
    // Choose random descendant....
    let randomDesc: TreeNode =
      tree.descendants[Math.floor(Math.random() * tree.descendants.length)];

    // Give promoted employee fired employee's salary & position & boss
    randomDesc.value = {
      name: randomDesc.value.name,
      jobTitle: tree.value.jobTitle,
      boss: tree.value.boss,
      salary: tree.value.salary,
    };

    // Loop through
    for (let i = 0; i < tree.descendants.length; i++) {
      if (tree.descendants[i] != randomDesc) {
        // Reassign descendant's boss to promoted employee
        tree.descendants[i].value.boss = randomDesc.value.name;
        // Push descendants (that aren't the randomly chosesn employee) to promoted employee's descendants
        randomDesc.descendants.push(tree.descendants[i]);
      }
    }

    console.log(
      `[fireEmployee]: Fired ${name} and replaced with ${randomDesc.value.name}`
    );
    return randomDesc;
  }

  if (tree.descendants.length > 0) {
    for (let i = 0; i < tree.descendants.length; i++) {
      tree.descendants[i] = fireEmployee(tree.descendants[i], name);
    }
  } else {
    return tree;
  }

  return tree;
}

// Helper function for promoteEmployee and demoteEmployee
function swapEmployeeValue(
  promotee: employee,
  demotee: employee
): [employee, employee] {
  let temp: employee = promotee;
  promotee = {
    name: promotee.name,
    jobTitle: demotee.jobTitle,
    boss: demotee.boss,
    salary: demotee.salary,
  };
  demotee = {
    name: demotee.name,
    jobTitle: temp.jobTitle,
    boss: temp.name,
    salary: temp.salary,
  };

  // return new Boss and new Subordinate with switched values
  return [promotee, demotee];
}

/**
 * Promotes an employee one level above their current ranking.
 * The promoted employee and their boss should swap places in the hierarchy.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {void}
 */
function promoteEmployee(tree: TreeNode, employeeName: string): void {
  // for loop
  // current node: check children
  for (let i = 0; i < tree.descendants.length; i++) {
    // Change value.boss of subordinates to promoted employee's name
    if (tree.descendants[i].value.name === employeeName) {
      // O(n x m) nested for loop but wouldn't cause a significant effect on efficiency if there aren't many subordinates.
      for (let i = 0; i < tree.descendants.length; i++) {
        if (tree.descendants[i].value.name != employeeName) {
          tree.descendants[i].value.boss = employeeName;
        }
      }

      // Swap nodes, set node equal to promoted employees'
      let [promotedEmployee, demotedEmployee] = swapEmployeeValue(
        tree.descendants[i].value,
        tree.value
      );

      tree.value = promotedEmployee;
      tree.descendants[i].value = demotedEmployee;

      console.log(
        `[promoteEmployee]: Promoted ${employeeName} and made ${demotedEmployee.name} his subordinate`
      );
    }

    // recurse if employee not found
    promoteEmployee(tree.descendants[i], employeeName);
  }
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
// Global variable
var found: boolean = false;

/**
 * Demotes an employee one level below their current ranking.
 * Picks a subordinate and swaps places in the hierarchy.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName the employee getting demoted
 * @param {string} subordinateName the new boss
 * @returns {void}
 */
function demoteEmployee(
  tree: TreeNode,
  employeeName: string,
  subordinateName: string
): void {
  // current node: check children
  // stop searching once node is found. more efficient.
  if (!found) {
    for (let i = 0; i < tree.descendants.length; i++) {
      if (
        tree.value.name === employeeName &&
        tree.descendants[i].value.name === subordinateName
      ) {
        found = true;
        // swap nodes
        let [promotedEmployee, demotedEmployee] = swapEmployeeValue(
          tree.descendants[i].value,
          tree.value
        );

        tree.value = promotedEmployee;
        tree.descendants[i].value = demotedEmployee;

        console.log(`[demoteEmployee]: Demoted employee (demoted ${employeeName} and replaced with ${subordinateName}) 
        `);
      }
      // recurse if employee not found
      demoteEmployee(tree.descendants[i], employeeName, subordinateName);
    }
  }
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
