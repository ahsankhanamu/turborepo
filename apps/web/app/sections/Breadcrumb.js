'use client';

import React, { useEffect, useState } from 'react';

const data = {
  dist: {
    'webpack.config.js': 'file',
    'package.json': 'file',
    other: {
      'webpack.config.js': 'file',
      'package.json': 'file',
      deeper: {
        'deepFile1.js': 'file',
        'deepFile2.js': 'file',
      },
    },
  },
  'breadcrumb.css': 'file',
  'breadcrumb.html': 'file',
  'devtools-icons.json': 'file',
  'navigationUtils.js': 'file',
  'package.json': 'file',
  'utils.js': 'file',
  'watchAndCombine.js': 'file',
  'widget.js': 'file',
  'widgetUtils.js': 'file',
  'x.html': 'file',
  'xpath-schema.json': 'file',
  someArray: [
    {
      file1: 'file',
      file2: 'file',
      file3: 'file',
    },
    'file4',
  ],
};

// Renders the root object entries
const RenderRootObject = ({ folderData, updateCurrentPath, parentPath }) => {
  return (
    <div>
      {Object.keys(folderData).map((key) => (
        <RenderObjectEntries
          key={key}
          folderData={folderData}
          keyName={key}
          updateCurrentPath={updateCurrentPath}
          parentPath={parentPath}
        />
      ))}
    </div>
  );
};

// Renders arrays at the root level
const RenderRootArray = ({ arrayData, keyName, updateCurrentPath, parentPath }) => {
  return (
    <div className="ml-6">
      {arrayData.map((item, idx) => (
        <RenderArrayItem
          key={idx}
          item={item}
          idx={idx}
          arrayKeyName={keyName}
          updateCurrentPath={updateCurrentPath}
          parentPath={parentPath}
        />
      ))}
    </div>
  );
};

// Renders object entries (folders or files)
const RenderObjectEntries = ({ folderData, keyName, updateCurrentPath, parentPath }) => {
  const [expanded, setExpanded] = useState(false);
  const value = folderData[keyName];
  const isArray = Array.isArray(value);
  const isFolder = typeof value === 'object' && value !== null;

  const handleClick = () => {
    if (isArray || isFolder) {
      updateCurrentPath([...parentPath, keyName]); // Update current path to include folder/array
    } else {
      updateCurrentPath(parentPath); // Update path to parent if it's a primitive value
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer w-full">
        {/* Chevron for expandable folders */}
        {isFolder && (
          <span
            className="mr-2 text-gray-400"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
          >
            {expanded ? '▼' : '▶'}
          </span>
        )}
        <div
          className="w-full"
          onClick={handleClick} // Navigation logic based on key
        >
          {isArray ? `${keyName} [ ]` : keyName}
        </div>
      </div>
      {/* Expanded object */}
      {expanded && isFolder && !isArray && (
        <RenderExpandedObject
          folderData={value}
          updateCurrentPath={updateCurrentPath}
          parentPath={[...parentPath, keyName]}
        />
      )}
      {/* Expanded array */}
      {expanded && isArray && (
        <RenderExpandedArray
          arrayData={value}
          keyName={keyName}
          updateCurrentPath={updateCurrentPath}
          parentPath={[...parentPath, keyName]}
        />
      )}
    </div>
  );
};

// Expands object entries (for folders)
const RenderExpandedObject = ({ folderData, updateCurrentPath, parentPath }) => {
  return (
    <div className="ml-6">
      <RenderRootObject
        folderData={folderData}
        updateCurrentPath={updateCurrentPath}
        parentPath={parentPath}
      />
    </div>
  );
};

// Renders array items
const RenderArrayItem = ({ item, idx, arrayKeyName, updateCurrentPath, parentPath }) => {
  const [expanded, setExpanded] = useState(false);
  const isObject = typeof item === 'object' && item !== null;

  const handleClick = () => {
    if (isObject) {
      updateCurrentPath([...parentPath, idx]);
    } else {
      updateCurrentPath(parentPath); // Navigate to parent if the value is primitive
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer w-full">
        {isObject && (
          <span
            className="mr-2 text-gray-400"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
          >
            {expanded ? '▼' : '▶'}
          </span>
        )}
        <div
          className="w-full"
          onClick={handleClick} // Navigation logic based on array index
        >
          {`[ ${idx} ]`}
        </div>
      </div>
      {expanded && isObject && (
        <RenderExpandedObject
          folderData={item}
          updateCurrentPath={updateCurrentPath}
          parentPath={[...parentPath, idx]}
        />
      )}
    </div>
  );
};

// Expands array items
const RenderExpandedArray = ({ arrayData, keyName, updateCurrentPath, parentPath }) => {
  return (
    <RenderRootArray
      arrayData={arrayData}
      keyName={keyName}
      updateCurrentPath={updateCurrentPath}
      parentPath={parentPath}
    />
  );
};

// Displays the current path above the breadcrumb
const RenderCurrentPath = ({ currentPath }) => {
  return (
    <div className="mb-2 text-gray-700">
      <strong>Current Path: </strong>
      {currentPath.length > 0 ? currentPath.join(' / ') : 'root'}
    </div>
  );
};

// Renders the breadcrumb navigation bar
const RenderBreadcrumbBar = ({ currentPath, updateCurrentPath }) => {
  const [dropdownIndex, setDropdownIndex] = useState(null);

  const toggleDropdown = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  const getDropdownData = (path) => {
    return path.reduce((acc, key) => {
      if (acc === undefined) {
        return undefined; // Early exit if acc is undefined
      }
      if (Array.isArray(acc)) {
        const parsedKey = parseInt(key);
        return acc[parsedKey] !== undefined ? acc[parsedKey] : undefined; // Check for valid array index
      } else {
        return acc[key]; // Regular object key access
      }
    }, data);
  };

  return (
    <div className="flex items-center space-x-2 text-sm">
      <div
        onClick={() => toggleDropdown(-1)}
        className={`relative cursor-pointer text-blue-600 hover:underline ${
          currentPath.length === 0 ? 'font-bold' : ''
        }`}
      >
        root
        {dropdownIndex === -1 && (
          <div className="absolute left-0 mt-2 w-48 max-h-48 overflow-y-auto bg-white border border-gray-200 rounded shadow-lg z-10">
            <RenderRootObject
              folderData={data}
              updateCurrentPath={updateCurrentPath}
              parentPath={[]}
            />
          </div>
        )}
      </div>

      {currentPath.map((folder, index) => {
        const currentData = getDropdownData(currentPath.slice(0, index + 1));
        const isLast = index === currentPath.length - 1;

        return (
          <div key={index} className="flex items-center space-x-2 relative">
            <span>/</span>
            <div
              onClick={() => toggleDropdown(index)}
              className={`cursor-pointer text-blue-600 hover:underline ${isLast ? 'font-bold' : ''}`}
            >
              {typeof folder === 'number'
                ? `[ ${folder} ]`
                : Array.isArray(currentData)
                  ? `${folder} []`
                  : folder}
              {dropdownIndex === index && (
                <div className="absolute left-0 mt-2 w-48 max-h-48 overflow-y-auto bg-white border border-gray-200 rounded shadow-lg z-10">
                  <RenderRootObject
                    folderData={currentData}
                    updateCurrentPath={updateCurrentPath}
                    parentPath={currentPath.slice(0, index + 1)}
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const App = () => {
  const [currentPath, setCurrentPath] = useState([]);

  const updateCurrentPath = (newPath) => {
    setCurrentPath(newPath); // Update the current path with the new path
  };

  useEffect(() => {
    document.body.style.height = '100vh';
  }, []);

  return (
    <div className="p-8 font-sans">
      <RenderCurrentPath currentPath={currentPath} />
      <RenderBreadcrumbBar currentPath={currentPath} updateCurrentPath={updateCurrentPath} />
    </div>
  );
};

export default App;
