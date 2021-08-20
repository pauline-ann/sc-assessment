import { TreeNode } from "./manageEmployees";

/**
 * Given an employee, will find the node above (if any).
 *
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {TreeNode}
 */
function getBoss(tree: TreeNode, employeeName: string): TreeNode {
  // loop through descendants and find employeeName
  for (let i = 0; i < tree.descendants.length; i++) {
    // if employee name found, return tree.value.name
    if (tree.descendants[i].value.name === employeeName) {
      console.log(`[getBoss]: ${employeeName}'s boss is ${tree.value.name}`);
    } else {
      getBoss(tree.descendants[i], employeeName);
    }
  }
  return tree;
}

/**
 * Given an employee, will find the nodes directly below (if any).
 * Notice how it returns possibly several subordinates.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {TreeNode[]}
 */
function getSubordinates(tree: TreeNode, employeeName: string): TreeNode[] {
  // if employeeName found
  if (tree.value.name === employeeName) {
    // find nodes directly below it (if any)
    let subordinateNames: string[] = [];
    let subordinateString: string = "";
    if (tree.descendants.length) {
      tree.descendants.forEach((descendant) => {
        subordinateNames.push(descendant.value.name);
        subordinateString = subordinateNames.join(", ");
      });

      console.log(
        `[getSubordinate]: Maria's subordinates are ${subordinateString}`
      );
      return tree.descendants;
    } else {
      console.log(`${employeeName} has no subordinates.`);
    }
  }

  // if current node is not employeeName, and has descendants,
  // recursively call function on its descendants
  if (tree.descendants.length) {
    for (let i = 0; i < tree.descendants.length; i++) {
      return getSubordinates(tree.descendants[i], employeeName);
    }
  }

  return tree.descendants;
}
/**
 * EXTRA CREDIT:
 * Finds and returns the lowest-ranking employee and the tree node's depth index.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {TreeNode}
 */
function findLowestEmployee() {}

export { getBoss, getSubordinates, findLowestEmployee };
