'use client';

import React from 'react';
import BreadcrumbApp from './Breadcrumb';
function page() {
  const handleToggle = (e) => {
    e.preventDefault();
    e.target.classList.toggle('open');
  };
  return (
    <>
      <BreadcrumbApp />
      <div className="container">
        <style>
          {`
            /* General Styles */
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

            .container {
            max-width: 600px;
            margin: 0 auto;
            }

            /* Section Styles */
            .section {
            background-color: white;
            margin-bottom: 20px;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            }

            .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
            background-color: #f0f0f0;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            cursor: pointer;
            user-select: none;
            }

            .section-title-container{
            display: flex;
            justify-content: space-between;
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

            /* List Item Styles */
            .list-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
            border-top: 1px solid #e0e0e0;
            }

            .item-title {
            font-size: 14px;
            color: #333;
            }

            .menu-button {
            font-size: 18px;
            }

            .list-item:hover {
            background-color: #f9f9f9;
            }

            .section-content {
            display: none;
            }

            .section .section {
                padding-left: 5px;
            }

            .collapse-icon {
            font-size: 12px;
            padding-right: 10px;
            }

            .section-header.open + .section-content {
            display: block;
            }
            `}
        </style>
        {/* <!-- Section 1 --> */}
        <div className="section">
          <div className="section-header open" onClick={handleToggle}>
            <div className="section-title-container">
              <button className="collapse-icon">▼</button>
              <span className="section-title">Section 1</span>
            </div>
            <div className="icons">
              <button className="sort-button">⇅</button>
              <button className="menu-button">⋮</button>
            </div>
          </div>
          <div className="section-content">
            <div className="list-item">
              <span className="item-title">webpack.config.js</span>
              <button className="menu-button">⋮</button>
            </div>
            <div className="list-item">
              <span className="item-title">package.json</span>
              <button className="menu-button">⋮</button>
            </div>
          </div>
        </div>

        {/* <!-- Section 2 --> */}
        <div className="section">
          <div className="section-header open" onClick={handleToggle}>
            <div className="section-title-container">
              <button className="collapse-icon">▼</button>
              <span className="section-title">Section 2</span>
            </div>
            <div className="icons">
              <button className="sort-button">⇅</button>
              <button className="menu-button">⋮</button>
            </div>
          </div>
          <div className="section-content">
            <div className="list-item">
              <span className="item-title">List item 2</span>
              <button className="menu-button">⋮</button>
            </div>
            <div className="list-item">
              <span className="item-title">List item 3</span>
              <button className="menu-button">⋮</button>
            </div>
            <div className="list-item">
              <span className="item-title">List item 4</span>
              <button className="menu-button">⋮</button>
            </div>
          </div>
        </div>

        {/* <!-- Section 3 --> */}
        <div className="section">
          <div className="section-header open" onClick={handleToggle}>
            <div className="section-title-container">
              <button className="collapse-icon">▼</button>
              <span className="section-title">Section 3</span>
            </div>
            <div className="icons">
              <button className="sort-button">⇅</button>
              <button className="menu-button">⋮</button>
            </div>
          </div>
          <div className="section-content">
            <div className="list-item">
              <span className="item-title">List item 5</span>
              <button className="menu-button">⋮</button>
            </div>
            <div className="section">
              <div className="section-header open" onClick={handleToggle}>
                <div className="section-title-container">
                  <button className="collapse-icon">▼</button>
                  <span className="section-title">Section 3.1</span>
                </div>
                <div className="icons">
                  <button className="sort-button">⇅</button>
                  <button className="menu-button">⋮</button>
                </div>
              </div>
              <div className="section-content">
                <div className="list-item">
                  <span className="item-title">List item 3.1.1</span>
                  <button className="menu-button">⋮</button>
                </div>
                <div className="list-item">
                  <span className="item-title">List item 3.1.2</span>
                  <button className="menu-button">⋮</button>
                </div>
                <div className="list-item">
                  <span className="item-title">List item 3.1.3</span>
                  <button className="menu-button">⋮</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
