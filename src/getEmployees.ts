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

// Helper function for findLowestEmployee function
function findLowestNode(tree: TreeNode, depth: number): [number, TreeNode] {
  // base
  if (tree === null) {
    return [-1, tree];
  }

  let largestDepth: number = depth;
  let lowestNode: TreeNode = tree;

  for (let i = 0; i < tree.descendants.length; i++) {
    // every time it recurses, add 1 to depth index
    let nextNode: [number, TreeNode] = findLowestNode(
      tree.descendants[i],
      depth + 1
    );

    // return the largest depth index
    if (nextNode[0] > largestDepth) {
      largestDepth = nextNode[0];
      lowestNode = nextNode[1];
    }
  }
  return [largestDepth, lowestNode];
}

// Don't need employee name string param to find lowest node

/**
 * EXTRA CREDIT:
 * Finds and returns the lowest-ranking employee and the tree node's depth index.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {TreeNode}
 */
function findLowestEmployee(tree: TreeNode): TreeNode {
  // call recursive function
  // 0 is the depth index of the root node
  let lowestEmployee: [number, TreeNode] = findLowestNode(tree, 0);

  console.log(
    `[findLowestEmployee]: Lowest Employee is ${lowestEmployee[1].value.name}, with a depth index of ${lowestEmployee[0]}`
  );

  return lowestEmployee[1];
}

export { getBoss, getSubordinates, findLowestEmployee };
