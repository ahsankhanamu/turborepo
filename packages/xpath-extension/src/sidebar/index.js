import { createRoot } from 'react-dom/client';
import React from 'react';
import '../css/global.css';

const App = () => {
  const slectorTypes = [
    { name: 'Rel cssSelector', value: 'body' },
    { name: 'Rel XPath', value: '//body' },
    { name: 'index XPath', value: '(//body)[1]' },
    { name: 'testRigor Path', value: 'antialiased' },
    { name: 'jQuery', value: '$("body")' },
  ];
  const buttons = [
    'Attribute',
    'Code',
    'POM Page',
    'XPath Healing',
    'Debugger',
    'Quote',
    'Customize UI',
    'Reset',
  ];

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">XPath/CSS Selector Tool</h1>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Write & verify XPath & CSS Selector here... Click on + icon to save value"
          className="w-full p-2 w-full border rounded-lg"
        />
      </div>

      <div className="mb-4 flex space-x-4">
        <div class="grid gap-4 grid-cols-4 grid-rows-2">
          {buttons.map((btn) => (
            <button key={btn} className="px-1 py-0.5 bg-yellow-500 text-white rounded-lg">
              {btn}
            </button>
          ))}
        </div>
      </div>

      <table className="w-full table-auto border-collapse border border-gray-300 mb-4">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Type</th>
            <th className="border border-gray-300 p-2">Value</th>
          </tr>
        </thead>
        <tbody>
          {slectorTypes.map((row, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">{row.name}</td>
              <td className="border border-gray-300 p-2">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="p-4 bg-gray-100 border rounded-lg">
        <code>&lt;bodytag class="antialiased" xpath="1"&gt;&lt;/bodytag&gt;</code>
      </div>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
