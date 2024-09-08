const fs = require("fs");
const path = require("path");

/**
 * Generates a tree structure from a directory.
 * @param {string} dirPath - The directory path to generate the tree from.
 * @returns {Object[]} The tree structure.
 */
function generateTree(dirPath) {
  const result = [];

  function traverseDirectory(currentPath, parent) {
    const files = fs.readdirSync(currentPath);

    files.forEach((file) => {
      const fullPath = path.join(currentPath, file);
      const isDirectory = fs.lstatSync(fullPath).isDirectory();

      const node = {
        id: fullPath,
        label: file,
        children: isDirectory ? [] : undefined,
      };

      if (parent) {
        parent.children.push(node);
      } else {
        result.push(node);
      }

      if (isDirectory) {
        traverseDirectory(fullPath, node);
      }
    });
  }

  traverseDirectory(dirPath, null);
  return result;
}

// Example usage
const dirPath = process.argv[2] || "."; // Default to current directory if no path is provided
const treeData = generateTree(dirPath);

// node generateTreeData.js /path/to/your/directory

console.log(JSON.stringify(treeData, null, 2));
