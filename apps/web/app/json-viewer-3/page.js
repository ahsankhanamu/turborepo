import React from 'react';
import JsonViewer from './JsonViewer';

function App() {
  const sampleJson = {
    name: 'John Doe',
    age: 30,
    married: false,
    children: [
      { name: 'Jane', age: 10 },
      { name: 'Doe', age: 8 },
    ],
    address: {
      city: 'New York',
      zipcode: '10001',
    },
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-center">JSON Viewer</h1>
      <div className="bg-white shadow-lg p-6 rounded-lg">
        <JsonViewer data={sampleJson} />
      </div>
    </div>
  );
}

export default App;
