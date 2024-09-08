"use client";
// pages/index.tsx

import React from "react";
import TreeView from "../../components/TreeView";
import { TreeNode } from "../../types/TreeNode";
import folderData from "../../lib/dirStructure.json";

const HomePage: React.FC = () => {
  const handleSelect = (node: TreeNode) => {
    console.log("Selected node:", node);
  };

  return (
    <div>
      <h1>Tree View Navigation</h1>
      <TreeView nodes={folderData as TreeNode[]} onSelect={handleSelect} />
    </div>
  );
};

export default HomePage;
