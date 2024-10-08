'use client';

import React, { useState } from 'react';

const JsonViewer = ({ data }) => {
  const [jsonData, setJsonData] = useState(data);
  const [expandedNodes, setExpandedNodes] = useState({});

  // Functions to handle adding different types of key-value pairs
  const addPrimitiveKeyValue = () => {
    setJsonData((prev) => ({
      ...prev,
      [`newKey${Object.keys(prev).length + 1}`]: 'new value',
    }));
  };

  const addObjectKeyValue = () => {
    setJsonData((prev) => ({
      ...prev,
      [`newObject${Object.keys(prev).length + 1}`]: { nestedKey: 'nested value' },
    }));
  };

  const addArrayKeyValue = () => {
    setJsonData((prev) => ({
      ...prev,
      [`newArray${Object.keys(prev).length + 1}`]: ['item1', 'item2'],
    }));
  };

  const handleToggle = (key) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isExpanded = (key) => expandedNodes[key];

  return (
    <div className="outer">
      {/* Buttons for adding different key-value pairs */}
      <div className="button-group">
        <button onClick={addPrimitiveKeyValue}>Add Primitive Key-Value</button>
        <button onClick={addObjectKeyValue}>Add Object Key-Value</button>
        <button onClick={addArrayKeyValue}>Add Array Key-Value</button>
      </div>

      <div className="tree">
        <table className="tree w-full">
          <colgroup>
            <col width="24px" />
            <col width="24px" />
            <col />
          </colgroup>
          <tbody>
            {Object.keys(jsonData).map((key, index) => (
              <React.Fragment key={index}>
                <TreeNode
                  nodeKey={key}
                  value={jsonData[key]}
                  level={0}
                  expanded={isExpanded(key)}
                  onToggle={() => handleToggle(key)}
                />
                {isExpanded(key) && typeof jsonData[key] === 'object' && jsonData[key] !== null && (
                  <TreeNodeChildren
                    parentKey={key}
                    value={jsonData[key]}
                    level={1}
                    expandedNodes={expandedNodes}
                    onToggle={handleToggle}
                  />
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TreeNode = ({ nodeKey, value, level, expanded, onToggle }) => {
  const isObject = typeof value === 'object' && value !== null;
  const isArray = Array.isArray(value);
  const size = isArray ? value.length : isObject ? Object.keys(value).length : null;

  return (
    <tr>
      <td>
        <button
          className={expanded ? 'expanded' : 'collapsed'}
          title="Click to expand/collapse"
          onClick={onToggle}
        >
          {expanded ? '-' : '+'}
        </button>
      </td>
      <td></td>
      <td>
        <table className="values border-collapse" style={{ marginLeft: `${level * 24}px` }}>
          <tbody>
            <tr>
              <td className="tree">
                <div contentEditable="true" spellCheck="false" className="field">
                  {nodeKey}
                </div>
              </td>
              <td className="separator">:</td>
              <td className="tree">
                {isObject ? (
                  <div className="readonly">{isArray ? `[${size}]` : `{${size}}`}</div>
                ) : (
                  <div
                    contentEditable="true"
                    spellCheck="false"
                    className="value"
                    style={{ color: getColor(value) }}
                  >
                    {String(value)}
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  );
};

const TreeNodeChildren = ({ parentKey, value, level, expandedNodes, onToggle }) => {
  return (
    <>
      {Object.keys(value).map((key, index) => {
        const nodeValue = value[key];
        const expanded = expandedNodes[`${parentKey}.${key}`];

        return (
          <React.Fragment key={index}>
            <TreeNode
              nodeKey={key}
              value={nodeValue}
              level={level}
              expanded={expanded}
              onToggle={() => onToggle(`${parentKey}.${key}`)}
            />
            {expanded && typeof nodeValue === 'object' && nodeValue !== null && (
              <TreeNodeChildren
                parentKey={`${parentKey}.${key}`}
                value={nodeValue}
                level={level + 1}
                expandedNodes={expandedNodes}
                onToggle={onToggle}
              />
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

// Helper function to determine the color of the value
const getColor = (value) => {
  if (typeof value === 'string') return 'green';
  if (typeof value === 'number') return 'purple';
  if (typeof value === 'boolean') return 'darkorange';
  return 'black';
};

export default JsonViewer;
