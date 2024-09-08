"use client";
// components/TreeView.tsx
import React, { useState } from "react";
import clsx from "clsx";
import styles from "./TreeView.module.css";
import { TreeNode } from "../types/TreeNode";

interface TreeViewProps {
  nodes: TreeNode[];
  onSelect: (node: TreeNode) => void;
}

const TreeView: React.FC<TreeViewProps> = ({ nodes, onSelect }) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  const handleToggle = (nodeId: string) => {
    setExpandedNodes((prev) => {
      const newExpandedNodes = new Set(prev);
      if (newExpandedNodes.has(nodeId)) {
        newExpandedNodes.delete(nodeId);
      } else {
        newExpandedNodes.add(nodeId);
      }
      return newExpandedNodes;
    });
  };

  const renderTree = (nodes: TreeNode[]) => {
    return nodes.map((node) => (
      <div key={node.id} className={styles.treeNode}>
        <div
          className={clsx(styles.treeNodeLabel, {
            [styles.expanded]: expandedNodes.has(node.id),
          })}
          onClick={() => {
            handleToggle(node.id);
            onSelect(node);
          }}
        >
          {node.children && (
            <span className={styles.toggleIcon}>
              {expandedNodes.has(node.id) ? "-" : "+"}
            </span>
          )}
          {node.label}
        </div>
        {node.children && expandedNodes.has(node.id) && (
          <div className={styles.treeNodeChildren}>
            {renderTree(node.children)}
          </div>
        )}
      </div>
    ));
  };

  return <div className={styles.treeView}>{renderTree(nodes)}</div>;
};

export default TreeView;
