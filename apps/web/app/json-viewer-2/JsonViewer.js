'use client';

import React, { useState, useEffect, useRef } from 'react';

function getJsonKey(json, pathArray) {
  if (pathArray.length === 0) {
    return json;
  }

  let key = pathArray.shift();

  if (!isNaN(key) && key !== '') {
    key = parseInt(key);
  }

  if (key in json) {
    return getJsonKey(json[key], pathArray);
  } else {
    return undefined;
  }
}

const JsonViewer = ({ data }) => {
  const [jsonData, setJsonData] = useState(data);
  const [activePath, setActivePath] = useState('');
  const [expandPath, setExpandPath] = useState([]); // Track path to expand
  const viewerRef = useRef();

  useEffect(() => {
    const traverseParent = (element, path = []) => {
      let key = element.getAttribute('datakey');
      let level = element.getAttribute('datalevel');

      if (key !== null && level !== null) {
        path.push(key);
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
      const clickedElement = event.target;
      const path = [];
      traverseParent(clickedElement, path);

      if (path.length > 0) {
        path.reverse();
        const jsonPath = path.join('.');
        setActivePath(jsonPath);
      }
    };

    viewerRef.current.addEventListener('click', handleGlobalClick);

    return () => {
      viewerRef.current.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  const handleAddPrimitive = () => {
    addKeyValuePair(() => prompt('Enter value for the new key:'));
  };

  const handleAddObject = () => {
    addKeyValuePair(() => ({}));
  };

  const handleAddArray = () => {
    addKeyValuePair(() => []);
  };

  const addKeyValuePair = (getNewValue) => {
    if (!activePath) {
      alert('Please select a path.');
      return;
    }

    const updatedJson = { ...jsonData };
    let pathParts = activePath.split('.');

    // Detect if the current selection points to a primitive value
    let current = getJsonKey(updatedJson, [...pathParts]);
    if (typeof current !== 'object' || current === null) {
      // Adjust the path to the parent if it's a primitive
      pathParts.pop();
      current = getJsonKey(updatedJson, [...pathParts]);
    }

    if (Array.isArray(current)) {
      // Add directly to the parent array
      const newValue = getNewValue();
      current.push(newValue);
      const newPath = [...pathParts, current.length - 1]; // Update to point to the new index in the array
      setExpandPath(newPath); // Set path to expand
      setActivePath(newPath.join('.')); // Update active path to the new array index
      setJsonData(updatedJson);
    } else if (typeof current === 'object' && !Array.isArray(current)) {
      // Handle adding a key-value pair to an object
      const newKey = prompt('Enter new key:');
      if (!newKey) {
        alert('Key cannot be empty.');
        return;
      }
      current[newKey] = getNewValue(newKey);
      const newPath = [...pathParts, newKey]; // Update to point to the new key in the object
      setExpandPath(newPath); // Set path to expand
      setActivePath(newPath.join('.')); // Update active path to the new key
      setJsonData(updatedJson);
    } else {
      alert('Invalid selection or unsupported data type.');
    }
  };

  const renderJson = (obj, level = 0, path = []) => {
    return Object.keys(obj).map((key, idx) => (
      <JsonNode
        key={idx}
        nodeKey={key}
        value={obj[key]}
        level={level}
        path={[...path, key]}
        expandPath={expandPath}
      />
    ));
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-4xl mx-auto" data-type="viewer">
      <h1 className="text-2xl font-bold mb-4">JSON Viewer</h1>
      <div className="mb-4">
        <p className="mb-2 bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
          {activePath || '{}'}
        </p>
        <button
          className="mb-2 p-2 bg-green-500 text-white rounded mr-2"
          onClick={handleAddPrimitive}
        >
          Add Primitive Key-Value
        </button>
        <button className="mb-2 p-2 bg-blue-500 text-white rounded mr-2" onClick={handleAddObject}>
          Add Object Key-Value
        </button>
        <button className="mb-2 p-2 bg-purple-500 text-white rounded" onClick={handleAddArray}>
          Add Array Key-Value
        </button>
      </div>
      <div className="text-left font-mono text-sm" ref={viewerRef}>
        {renderJson(jsonData)}
      </div>
    </div>
  );
};

const JsonNode = ({ nodeKey, value, level, path, expandPath }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const isObject = typeof value === 'object' && value !== null;
  const isArray = Array.isArray(value);
  const size = isArray ? value.length : isObject ? Object.keys(value).length : null;

  useEffect(() => {
    const shouldExpand = expandPath.length > 0 && expandPath.join('.').startsWith(path.join('.'));
    if (shouldExpand) {
      setIsCollapsed(false);
    }
  }, [expandPath, path]);

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
                <JsonNode
                  key={idx}
                  nodeKey={key}
                  value={value[key]}
                  level={level + 1}
                  path={[...path, key]}
                  expandPath={expandPath}
                />
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
