import JsonViewer from './JsonViewer';
// Sample data
const data = {
  pageLoaded: "//iframe[@title='Name of page']",
  mainIframe: "//iframe[@title='Name of page']",
  childIframe: "//iframe[@title='Iframe of page']",
  topLevelSelector: "//div[@id='randomDiv']",
  sectionSelectors: {
    name: "//input[@name='fname']",
    email: "//input[@name='email']",
    address: {
      line1: "//input[@name='line1Address']",
      line2: "//input[@name='line2Address']",
      city: "//input[@name='cityName']",
      country: "//input[@name='countryName']",
    },
    object: {
      x: 1,
    },
  },
  abc: true,
  groupSelectors: [
    {
      name: 'Some name',
      email: 'mail@example.com',
    },
    {
      name: 'Some Other name',
      email: 'mail@test.com',
    },
  ],
};

// Main App component
function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <JsonViewer data={data} />
    </div>
  );
}

export default App;
