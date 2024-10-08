import React, { useState } from 'react';

// Renders the root object entries
const RenderRootObject = ({ folderData, updateCurrentView, parentPath }) => {
  return (
    <div>
      {Object.keys(folderData).map((key) => (
        <RenderObjectEntries
          key={key}
          folderData={folderData}
          keyName={key}
          updateCurrentView={updateCurrentView}
          parentPath={parentPath}
        />
      ))}
    </div>
  );
};

// Renders arrays at the root level
const RenderRootArray = ({ folderData, keyName, updateCurrentView, parentPath }) => {
  return (
    <div className="ml-6">
      {folderData.map((_, idx) => (
        <RenderArrayItem
          key={idx}
          idx={idx}
          folderData={folderData}
          arrayKeyName={keyName}
          updateCurrentView={updateCurrentView}
          parentPath={parentPath}
        />
      ))}
    </div>
  );
};

// Renders object entries (folders or files)
const RenderObjectEntries = ({ folderData, keyName, updateCurrentView, parentPath }) => {
  const [expanded, setExpanded] = useState(false);
  const value = folderData[keyName];
  const isArray = Array.isArray(value);
  const isFolder = typeof value === 'object' && value !== null;

  const handleClick = () => {
    updateCurrentView({
      currentData: folderData,
      key: keyName,
      currentPath: parentPath,
    });
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer w-full">
        {isFolder && (
          <button
            className="mr-2 text-gray-400 focus:outline-none"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
          >
            {expanded ? '▼' : '▶'}
          </button>
        )}
        <div className="w-full" onClick={handleClick}>
          {isArray ? `${keyName} [ ]` : keyName}
        </div>
      </div>
      {expanded && isFolder && !isArray && (
        <div className="ml-6">
          <RenderRootObject
            folderData={value}
            updateCurrentView={updateCurrentView}
            parentPath={[...parentPath, keyName]}
          />
        </div>
      )}
      {expanded && isArray && (
        <RenderRootArray
          folderData={value}
          keyName={keyName}
          updateCurrentView={updateCurrentView}
          parentPath={[...parentPath, keyName]}
        />
      )}
    </div>
  );
};

// Renders array items
const RenderArrayItem = ({ folderData, idx, arrayKeyName, updateCurrentView, parentPath }) => {
  const item = folderData[idx];
  const [expanded, setExpanded] = useState(false);
  const isObject = typeof item === 'object' && item !== null;

  const handleClick = () => {
    // specially handling the primitive indexes, as the object based indexes are are already handled by rootObject > objectEntries
    updateCurrentView({
      currentData: folderData,
      key: idx,
      currentPath: parentPath,
    });
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer w-full">
        {isObject && (
          <button
            className="mr-2 text-gray-400 focus:outline-none"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
          >
            {expanded ? '▼' : '▶'}
          </button>
        )}
        <div className="w-full" onClick={handleClick}>
          {`[ ${idx} ]`}
        </div>
      </div>
      {expanded && isObject && (
        <div className="ml-6">
          <RenderRootObject
            folderData={item}
            updateCurrentView={updateCurrentView}
            parentPath={[...parentPath, idx]}
          />
        </div>
      )}
    </div>
  );
};

// Renders the breadcrumb navigation bar
const Breadcrumb = ({ currentPath, updateCurrentView, data }) => {
  const [dropdownIndex, setDropdownIndex] = useState(null);

  const toggleDropdown = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  const getDropdownData = (path) => {
    return path.reduce((acc, key) => {
      if (!acc) return undefined;
      return Array.isArray(acc) ? acc[parseInt(key)] : acc[key];
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
              updateCurrentView={updateCurrentView}
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
                    updateCurrentView={updateCurrentView}
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

export default Breadcrumb;
