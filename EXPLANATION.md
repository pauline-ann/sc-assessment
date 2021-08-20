# Social Curator Developer Assessment
## Explanation

### Instructions on how to install and run your code
1. Download code or fork the git repository
2. Install `Node.js` and `TypeScript` if not already
3. Cd into the project's root folder using the terminal/command prompt
4. Run `npm install`
5. Run `tsc` to compile TypeScript code
6. Run `npm run start` to run index.js
7. View console to see the application's output.

### Any noteworthy logic/style decisions you made? If so, what is your reasoning?
- Throughout each function, I used a recursive approach to find the solution. Since we are using a `TreeNode` class to represent a node and its' descendants, the tree itself is a recursive data structure. This is because the child nodes of a `TreeNode`, are TreeNodes themselves. Therefore, when traversing the tree, the function can call upon itself to traverse the current node's descendants. My code came out cleaner this way as we are able to reuse the same logic as we go through each node.
- For the `demoteEmployee` function, I used a global variable named `found` to denote whether the employee we are looking for has been found. This avoids traversing the tree's other branches, thus improving efficiency. However, a slight risk made by using global variables is causing possible unexpected side effects. To avoid this, special attention must be made so that the variable isn't used in other functions and `found === true` when `demoteEmployee` is called.
- I created the `swapEmployeeValue` function to swap the TreeNode Value when two nodes at different depth indices are being switched. This way, the `demoteEmployee` and `promoteEmployee` can share the logic within it to swap node values.

### If you had more time, what improvements would you implement?
- Spend more time cleaning up the code to make it more readable and check for cases where code can be reused.
- Search for where logic could be made more efficient, such as telling each function to stop searching other branches once a node has been found.
- Account for edge cases such as when a node isn't found, or if a node has no subordinates, if given more time.
- Find a solution that avoids using a nested for loop to reassign the `bossName` of child nodes in the `promoteEmployee` and `demoteEmployee` functions. Although this for loop is only called when a specific node is found, typically for loops should be avoided and I wish I had more time to think of a more elegant and efficient solution.

### Bonus: There are two functions that have very similar logic and could be merged into one. Which functions do you think can be merged and why?

1) `demoteEmployee`
2) `promoteEmployee`

These two functions are very similar in logic in that they are switching the positions of a boss and a subordinate in the tree. The main difference is that these functions accept different parameters. The merged function can be redesigned in such a way that it can demote or promote an employee depending on the position that an employee is placed in the parameters of the function.