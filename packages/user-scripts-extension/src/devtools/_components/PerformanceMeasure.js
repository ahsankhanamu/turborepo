import React, { useState } from 'react';

const PerformanceMeasure = () => {
  const [isCreatingRecording, setIsCreatingRecording] = useState(false);

  const handleCreateRecordingClick = () => {
    setIsCreatingRecording(true);
  };

  return (
    <div className="p-6 bg-[#1c1c1c] text-[#d4d4d4] rounded-lg shadow-lg">
      {/* Toolbar Section */}
      <div className="flex justify-between items-center mb-6 p-2 bg-[#1c1c1c] border-b border-[#3a3a3a]">
        <div className="flex items-center space-x-4">
          <button className="text-[#f5c869] hover:text-[#ffde96] focus:text-[#ffe0a3]">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
          </button>
          <select className="bg-transparent text-[#d4d4d4] border-none focus:outline-none">
            <option>No recordings</option>
          </select>
          <button className="text-[#f5c869] hover:text-[#ffde96] focus:text-[#ffe0a3]">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 4h18M9 12h6M3 20h18"
              ></path>
            </svg>
          </button>
          <button className="text-[#f5c869] hover:text-[#ffde96] focus:text-[#ffe0a3]">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h14M12 5v14"
              ></path>
            </svg>
          </button>
          <button className="text-[#f5c869] hover:text-[#ffde96] focus:text-[#ffe0a3]">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h8m-4-4v8"
              ></path>
            </svg>
          </button>
          <button className="text-[#f5c869] hover:text-[#ffde96] focus:text-[#ffe0a3]" disabled>
            <svg
              className="w-6 h-6 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4l16 16M4 16l16-16"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-[#f5c869] hover:text-[#ffde96] focus:text-[#ffe0a3]">
            Send feedback
          </button>
          <button className="text-[#f5c869] hover:text-[#ffde96] focus:text-[#ffe0a3]">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {!isCreatingRecording ? (
        <div className="p-6 bg-[#1c1c1c] text-[#d4d4d4] rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold text-white">
            Measure performance across an entire user journey
          </h1>
          <ul className="space-y-4 mt-4">
            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#f5c869] text-black flex items-center justify-center">
                1
              </span>
              <p>Record a common user journey on your website or app</p>
            </li>
            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#f5c869] text-black flex items-center justify-center">
                2
              </span>
              <p>Replay the recording to check if the flow is working</p>
            </li>
            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#f5c869] text-black flex items-center justify-center">
                3
              </span>
              <p>Generate a detailed performance trace or export a Puppeteer script for testing</p>
            </li>
          </ul>
          <button
            onClick={handleCreateRecordingClick}
            className="w-full py-3 mt-6 bg-[#f5c869] text-black rounded-md font-medium hover:bg-[#ffde96] focus:bg-[#ffe0a3]"
          >
            Create a new recording
          </button>
        </div>
      ) : (
        <div className="p-6 bg-[#1c1c1c] text-[#d4d4d4] rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold text-white mb-6">Create a new recording</h1>

          {/* Recording Name Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">RECORDING NAME</label>
            <input
              type="text"
              defaultValue={`Recording ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`}
              className="w-full p-2 bg-[#2a2a2a] text-[#d4d4d4] border border-[#f5c869] rounded-md focus:outline-none focus:border-[#ffde96]"
            />
          </div>

          {/* Selector Attribute Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              SELECTOR ATTRIBUTE{' '}
              <svg
                className="w-4 h-4 inline-block text-[#f5c869]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-1h1v1zm-1-4h1v1h-1v-1zm0 3v1h1v-1h-1zM12 9h-1v2h1V9zm2 2h-1v2h1v-2zm-4 0H9v2h1v-2zm1 2h-1v1h1v-1zm0-5h-1v1h1V8zM8 9H7v2h1V9zm0-4H7v2h1V5zm5 0h-1v2h1V5zm2 1h-1v2h1V6zm-4 2H9v1h1V8zm5 0h-1v1h1V8z"
                ></path>
              </svg>
            </label>
            <input
              type="text"
              defaultValue="data-testid"
              className="w-full p-2 bg-[#2a2a2a] text-[#d4d4d4] border border-[#3a3a3a] rounded-md focus:outline-none focus:border-[#ffde96]"
            />
          </div>

          {/* Selector Types to Record */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              SELECTOR TYPES TO RECORD{' '}
              <svg
                className="w-4 h-4 inline-block text-[#f5c869]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-1h1v1zm-1-4h1v1h-1v-1zm0 3v1h1v-1h-1zM12 9h-1v2h1V9zm2 2h-1v2h1v-2zm-4 0H9v2h1v-2zm1 2h-1v1h1v-1zm0-5h-1v1h1V8zM8 9H7v2h1V9zm0-4H7v2h1V5zm5 0h-1v2h1V5zm2 1h-1v2h1V6zm-4 2H9v1h1V8zm5 0h-1v1h1V8z"
                ></path>
              </svg>
            </label>
            <div className="flex items-center space-x-4">
              {['CSS', 'ARIA', 'Text', 'XPath', 'Pierce'].map((type, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    defaultChecked={type !== 'ARIA'}
                    className="form-checkbox h-4 w-4 text-[#f5c869] bg-[#2a2a2a] border-[#3a3a3a] rounded focus:outline-none focus:ring focus:ring-[#ffde96]"
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Start Recording Button */}
          <button className="w-full py-3 bg-red-600 text-white rounded-full font-medium hover:bg-red-500 focus:bg-red-400 mt-6 flex items-center justify-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 5v14l9-7-9-7z"
              ></path>
            </svg>
            Start recording
          </button>
        </div>
      )}
    </div>
  );
};

export default PerformanceMeasure;
