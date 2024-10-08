'use client';

import React, { useState, useEffect, useRef } from 'react';

// Function to get the JSON value based on a path array
function getJsonKey(json, pathArray) {
  if (pathArray.length === 0) {
    return json; // Base case: when the path is empty, return the current value
  }

  let key = pathArray.shift(); // Get the first key

  // Handle array index access if the key is a number
  if (!isNaN(key) && key !== '') {
    key = parseInt(key); // Convert string to number for array index
  }

  // Check if the key exists in the object/array, even if it's an empty string
  if (key in json) {
    return getJsonKey(json[key], pathArray); // Recursively call with the remaining path
  } else {
    return undefined; // Return undefined if key is not found
  }
}

const JsonViewer = ({ data }) => {
  const [jsonData, setJsonData] = useState(data); // JSON Data
  const [activePath, setActivePath] = useState(''); // Track the currently selected path
  const viewerRef = useRef();

  useEffect(() => {
    const traverseParent = function (element, path = []) {
      let key = element.getAttribute('datakey');
      let level = element.getAttribute('datalevel');

      if (key !== null && level !== null) {
        path.push(key); // Prepend the key to build the path from bottom to top
      }
      if (level === '0') {
        return;
      } else if (element === document.body) {
        path = [];
        return;
      }
      element = element.parentElement;
      traverseParent(element, path);
    };

    const handleGlobalClick = (event) => {
      let clickedElement = event.target;
      const path = [];
      traverseParent(clickedElement, path);

      if (path.length > 0) {
        path.reverse();
        const jsonPath = path.join('.');
        setActivePath(jsonPath); // Update active path
      }
    };

    viewerRef.current.addEventListener('click', handleGlobalClick);

    return () => {
      viewerRef.current.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  // Function to handle adding either a new key-value pair or a value to an array based on the active path
  const handleAdd = () => {
    if (!activePath) {
      alert('Please select a path.');
      return;
    }

    const updatedJson = { ...jsonData };
    const pathParts = activePath.split('.');
    let current = getJsonKey(updatedJson, [...pathParts]);

    // If the current path resolves to a primitive type, use the parent path
    if (typeof current !== 'object') {
      pathParts.pop(); // Remove the last part to point to the parent
      current = getJsonKey(updatedJson, [...pathParts]);
    }

    // Auto-detect if the current path is an object or an array
    if (typeof current === 'object' && !Array.isArray(current)) {
      // Handle object case
      const newKey = prompt('Enter new key:');
      if (!newKey) {
        alert('Key cannot be empty.');
        return;
      }
      const newValue = prompt('Enter new value:');
      current[newKey] = newValue; // Add new key-value pair
    } else if (Array.isArray(current)) {
      // Handle array case
      const newValue = prompt('Enter new value to add to the array:');
      current.push(newValue); // Push new value into the array
    } else {
      alert('Invalid selection or unsupported data type.');
    }

    setJsonData(updatedJson); // Update state
  };

  const renderJson = (obj, level = 0) => {
    return Object.keys(obj).map((key, idx) => {
      return <JsonNode key={idx} nodeKey={key} value={obj[key]} level={level} />;
    });
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-4xl mx-auto" data-type="viewer">
      <h1 className="text-2xl font-bold mb-4">JSON Viewer</h1>
      <div className="mb-4">
        <p className="mb-2 bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
          {activePath || '{}'}
        </p>
        <button className="mb-2 p-2 bg-green-500 text-white rounded" onClick={handleAdd}>
          Add New Key-Value or Value
        </button>
      </div>
      <div className="text-left font-mono text-sm" ref={viewerRef}>
        {renderJson(jsonData)}
      </div>
    </div>
  );
};

const JsonNode = ({ nodeKey, value, level }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const isObject = typeof value === 'object' && value !== null;
  const isArray = Array.isArray(value);
  const size = isArray ? value.length : isObject ? Object.keys(value).length : null;

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className="mb-2"
      style={{ marginLeft: `${level * 20}px` }}
      datakey={nodeKey}
      datalevel={level}
    >
      {isObject ? (
        <>
          <span onClick={toggleCollapse} className="cursor-pointer text-blue-600">
            {isCollapsed ? '+ ' : '- '}
          </span>
          <span className="px-2 font-bold text-blue-900">{nodeKey}</span>
          <span className="separator">{': '}</span>
          <span className="text-gray-600">
            {`${isArray ? '[' : '{'}${size}${isArray ? ']' : '}'}`}
          </span>
          {!isCollapsed && (
            <div className="mt-1">
              {Object.keys(value).map((key, idx) => (
                <JsonNode key={idx} nodeKey={key} value={value[key]} level={level + 1} />
              ))}
            </div>
          )}
        </>
      ) : (
        <JsonPrimitiveNode nodeKey={nodeKey} value={value} level={level} />
      )}
    </div>
  );
};

const JsonPrimitiveNode = ({ nodeKey, value, level }) => {
  const renderValue = () => {
    if (typeof value === 'string') {
      return <span className="px-2 text-green-600">{value}</span>;
    } else if (typeof value === 'number') {
      return <span className="px-2 text-purple-600">{value}</span>;
    } else if (typeof value === 'boolean') {
      return <span className="px-2 text-red-600">{value.toString()}</span>;
    } else if (value === null) {
      return <span className="px-2 text-gray-500">null</span>;
    } else {
      return `Unknown value`;
    }
  };

  return (
    <>
      <span className="cursor-pointer text-blue-600">&nbsp;&nbsp;</span>
      <span className="px-2 font-bold text-blue-900">{nodeKey}</span>
      <span className="separator">{': '}</span>
      <span className="cursor-pointer">{renderValue()}</span>
    </>
  );
};

export default JsonViewer;
