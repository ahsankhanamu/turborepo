import React from 'react';
import JsonViewer from './JsonViewer';

const sampleJson = {
  name: 'John Doe',
  age: 30,
  skills: {
    programming: ['JavaScript', 'React', 'Node'],
    languages: ['English', 'Spanish'],
  },
  isEmployed: true,
  education: [
    { level: "Bachelor's", major: 'Computer Science' },
    { level: "Master's", major: 'Software Engineering' },
  ],
  '': 'value with empty key name',
};

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <JsonViewer data={sampleJson} />
    </div>
  );
}

export default App;
