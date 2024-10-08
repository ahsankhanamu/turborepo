'use client';

import React, { useState, useEffect } from 'react';

const Screens = ({ currentData, updateCurrentView }) => {
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    const handleAnimationEnd = () => setAnimationClass('');
    const sectionContent = document.querySelector('.section-content');
    sectionContent?.addEventListener('animationend', handleAnimationEnd);

    return () => {
      sectionContent?.removeEventListener('animationend', handleAnimationEnd);
    };
  }, [currentData]);

  return (
    <>
      <div className={`section-content ${animationClass}`}>
        {Object.entries(currentData).map(([key, value]) => {
          const isObject = typeof value === 'object' && value !== null;
          return isObject ? (
            <div key={key} className="section">
              <div className="section-header" onClick={() => updateCurrentView(key)}>
                <div className="section-title-container">
                  <span className="section-title">{key}</span>
                </div>
                <div className="icons">
                  <span className="chevron-icon">▶</span>
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
    </>
  );
};

export default Screens;
