'use client';
import React, { useState } from 'react';
import {
  FaWindowMinimize,
  FaWindowMaximize,
  FaTimes,
  FaClone,
  FaFolder,
  FaTrash,
  FaChevronLeft,
  FaGripVertical,
  FaEllipsisV,
  FaFilter,
  FaAngleRight,
} from 'react-icons/fa';
import { TbLayoutSidebarLeftCollapse } from 'react-icons/tb';

export default function SelectorWidget() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const toggleOverlay = () => setShowOverlay(!showOverlay);
  const toggleSearchBar = () => setShowSearchBar(!showSearchBar);

  return (
    <div className="relative p-4 bg-gray-100 rounded-lg shadow-lg max-w-lg mx-auto text-gray-800">
      {/* Title Row */}
      <div className="flex items-center justify-between border-b border-gray-300 pb-2 mb-3">
        <h2 className="text-xl font-bold text-blue-700">Selector Widget</h2>
        <div className="flex space-x-2 text-gray-600">
          <button className="p-2 hover:bg-gray-200 rounded-full">
            <FaWindowMinimize />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded-full">
            <FaWindowMaximize />
          </button>
          <button className="p-2 hover:bg-red-200 rounded-full">
            <FaTimes />
          </button>
        </div>
      </div>

      {/* Second Row - Sidebar Icon, Select All, Center Icons, Iframe Select */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-200 rounded-full text-2xl">
            <TbLayoutSidebarLeftCollapse />
          </button>{' '}
          {/* Enlarged Sidebar Icon */}
          <label className="flex items-center space-x-1">
            <input type="checkbox" className="checkbox" />
            <span className="text-sm">Select All</span>
          </label>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 hover:bg-gray-200 rounded-full">
            <FaClone />
          </button>{' '}
          {/* Copy */}
          <button className="p-2 hover:bg-gray-200 rounded-full">
            <FaFolder />
          </button>{' '}
          {/* Group */}
          <button className="p-2 hover:bg-red-200 rounded-full">
            <FaTrash />
          </button>{' '}
          {/* Delete */}
        </div>
        <div className="flex space-x-3">
          <button className="p-2 hover:bg-gray-200 rounded-full" onClick={toggleSearchBar}>
            <FaFilter /> {/* Filter Icon */}
          </button>
          <select className="p-2 bg-white border border-gray-300 rounded shadow-sm">
            <option>Iframe List</option>
            <option>Iframe 1</option>
            <option>Iframe 2</option>
          </select>
        </div>
      </div>

      {/* Search Bar with Dropdown */}
      {showSearchBar && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 mb-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="bg-white border border-gray-300 rounded shadow-lg max-h-40 overflow-y-auto">
            <p className="p-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100">
              Suggested Item 1
            </p>
            <p className="p-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100">
              Suggested Item 2
            </p>
            <p className="p-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100">
              Suggested Item 3
            </p>
          </div>
        </div>
      )}

      {/* Back Button and Breadcrumb Row */}
      <div className="flex items-center gap-4 mb-4">
        <button className="flex items-center p-2 px-3 bg-gray-200 rounded hover:bg-gray-300">
          <FaChevronLeft className="mr-1" /> Back
        </button>
        <div className="text-sm text-gray-600 flex items-center space-x-1">
          <span>Home</span>
          <FaAngleRight className="text-xs" />
          <span>Selector</span>
        </div>
      </div>

      {/* Select Button Row */}
      <div className="flex items-center justify-between mb-4">
        <button className="p-2 px-3 bg-green-500 text-white rounded-full hover:bg-green-600">
          Select
        </button>
        <div className="flex space-x-2">
          <button className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 active:bg-gray-400">
            +
          </button>
          <button className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 active:bg-gray-400">
            &#123;&#125;
          </button>
          <button className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 active:bg-gray-400">
            [ ]
          </button>
        </div>
      </div>

      {/* Overlay (Visible on Select button click) */}
      {showOverlay && (
        <div className="overlay absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="overlay-content bg-white p-4 rounded shadow-lg max-w-sm text-center">
            <p>Overlay Content Here</p>
            <button
              onClick={toggleOverlay}
              className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* List Container */}
      <div className="list-container mt-4 space-y-2">
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50 cursor-pointer"
          >
            {/* Left Section - Draggable Icon */}
            <div className="flex items-center justify-center w-8 text-gray-400">
              <FaGripVertical /> {/* Draggable Indicator */}
            </div>

            {/* Center Section - One-line Text */}
            <div className="flex-1 text-sm font-medium text-gray-700 text-center">
              | SelectorTitle | action | category | value | state |
            </div>

            {/* Right Section - Options Icon */}
            <button className="p-2 text-gray-500 hover:text-gray-700 flex items-center justify-center">
              <FaEllipsisV />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
