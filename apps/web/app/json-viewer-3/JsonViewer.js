'use client';

import React, { useState } from 'react';

const JsonViewer = ({ data }) => {
  if (typeof data === 'object' && !Array.isArray(data)) {
    return <JsonObjectViewer data={data} />;
  } else if (Array.isArray(data)) {
    return <JsonArrayViewer data={data} />;
  } else {
    return <JsonPrimitiveViewer data={data} />;
  }
};

// Viewer for JSON objects
const JsonObjectViewer = ({ data }) => {
  const [collapsed, setCollapsed] = useState(false);
  const keys = Object.keys(data);

  return (
    <div className="ml-4">
      <button onClick={() => setCollapsed(!collapsed)} className="text-blue-600">
        {collapsed ? '+' : '-'} Object
      </button>
      {!collapsed && (
        <ul className="list-none pl-4">
          {keys.map((key) => (
            <li key={key}>
              <span className="text-pink-600">"{key}":</span> <JsonViewer data={data[key]} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Viewer for JSON arrays
const JsonArrayViewer = ({ data }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="ml-4">
      <button onClick={() => setCollapsed(!collapsed)} className="text-blue-600">
        {collapsed ? '+' : '-'} Array
      </button>
      {!collapsed && (
        <ul className="list-none pl-4">
          {data.map((item, index) => (
            <li key={index}>
              <JsonViewer data={item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Viewer for primitive values (string, number, boolean, null)
const JsonPrimitiveViewer = ({ data }) => {
  let typeClass = '';
  if (typeof data === 'string') {
    typeClass = 'text-green-600';
  } else if (typeof data === 'number') {
    typeClass = 'text-purple-600';
  } else if (typeof data === 'boolean') {
    typeClass = 'text-yellow-600';
  } else if (data === null) {
    typeClass = 'text-gray-600';
  }

  return <span className={typeClass}>{JSON.stringify(data)}</span>;
};

export default JsonViewer;
