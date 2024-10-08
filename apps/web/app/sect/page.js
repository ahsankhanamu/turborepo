'use client';

import React, { useState, useEffect } from 'react';
import Breadcrumb from './Breadcrumb';

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

const JSONViewer = () => {
  const [currentData, setCurrentData] = useState(data); // Displayed level of data
  const [currentPath, setCurrentPath] = useState([]); // Breadcrumb path
  const [history, setHistory] = useState([[[], data]]); // History stack for navigation, currentPath and currentData
  const [animationClass, setAnimationClass] = useState(''); // Animation class for transitions

  useEffect(() => {
    // Remove animation class after animation completes to reset for next interaction
    const handleAnimationEnd = () => setAnimationClass('');
    const sectionContent = document.querySelector('.section-content');
    sectionContent?.addEventListener('animationend', handleAnimationEnd);

    return () => {
      sectionContent?.removeEventListener('animationend', handleAnimationEnd);
    };
  }, [currentData]);

  const updateCurrentView = ({ currentData, key, currentPath: finalPath = currentPath }) => {
    const isObject = typeof currentData[key] === 'object' && currentData[key] !== null;
    const nextLevel = isObject ? currentData[key] : currentData;
    const newCurrentPath = isObject ? [...finalPath, key] : finalPath;
    if (typeof nextLevel === 'object') {
      setHistory([...history, [newCurrentPath, currentData]]);
      setCurrentData(nextLevel);
      setCurrentPath(newCurrentPath);
      setAnimationClass('slide-in'); // Apply slide-in animation
    }
  };

  const goBack = () => {
    console.log(history, currentPath);
    console.log(history.at(-2), currentPath);
    if (history.length > 1) {
      const lastEntry = history.slice(0, -1);
      setHistory(lastEntry);
      setCurrentData(lastEntry.at(-1)[1]);
      setCurrentPath(lastEntry.at(-1)[0]);
      setAnimationClass('slide-out'); // Apply slide-out animation
    }
  };

  const renderCurrentLevel = () => {
    return (
      <div className={`section-content ${animationClass}`}>
        {Object.entries(currentData).map(([key, value]) => {
          const isObject = typeof value === 'object' && value !== null;
          return isObject ? (
            <div key={key} className="section">
              <div
                className="section-header"
                onClick={() => updateCurrentView({ currentData, key })}
              >
                <div className="section-title-container">
                  <span className="section-title">{key}</span>
                </div>
                <div className="icons">
                  <span className="chevron-icon">▶</span> {/* Right Chevron */}
                </div>
              </div>
            </div>
          ) : (
            <div key={key} className="list-item">
              <span className="item-title">
                {key}: {value}
              </span>
              <div className="icons">
                <button className="menu-button">⋮</button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="p-8 font-sans">
      <div className="mb-2 flex items-center space-x-4 text-gray-700">
        <button className="back-button" onClick={goBack} disabled={history.length <= 1}>
          <span className="back-chevron">◀</span> Back
        </button>
        <Breadcrumb
          currentPath={currentPath}
          data={data}
          setCurrentData={setCurrentData}
          updateCurrentView={updateCurrentView}
        />
      </div>
      {renderCurrentLevel()}
      <style>
        {`
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            padding: 20px;
          }
          .section-content {
            transition: transform 0.3s ease;
            position: relative;
          }
          .slide-in {
            animation: slide-in 0.3s forwards;
          }
          .slide-out {
            animation: slide-out 0.3s forwards;
          }
          @keyframes slide-in {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
          @keyframes slide-out {
            from { transform: translateX(0); }
            to { transform: translateX(100%); }
          }
          .section {
            background-color: white;
            margin-bottom: 10px;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }
          .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
            background-color: #f0f0f0;
            cursor: pointer;
            user-select: none;
            border-radius: 8px;
          }
          .section-title-container {
            display: flex;
            align-items: center;
          }
          .section-title {
            font-size: 16px;
            font-weight: bold;
            color: #333;
          }
          .icons {
            display: flex;
            gap: 10px;
            align-items: center;
          }
          .chevron-icon {
            font-size: 18px;
            color: #888;
          }
          .sort-button, .menu-button {
            background: none;
            border: none;
            cursor: pointer;
            font-size: 16px;
            color: #666;
          }
          .sort-button:hover, .menu-button:hover {
            color: #333;
          }
          .back-button {
            background: none;
            border: none;
            color: #007bff;
            cursor: pointer;
            font-size: 16px;
            display: flex;
            align-items: center;
            gap: 5px;
          }
          .back-chevron {
            font-size: 18px;
            margin-right: 5px;
          }
          .list-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            border-top: 1px solid #e0e0e0;
            background-color: white;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }
          .list-item:first-child, .section + .list-item {
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
          }
          .list-item:last-child, .list-item:has(+ .section) {
            margin-bottom: 10px;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
          }
          .item-title {
            font-size: 14px;
            color: #333;
          }
        `}
      </style>
    </div>
  );
};

export default JSONViewer;
