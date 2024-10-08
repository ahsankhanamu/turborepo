import JsonViewer from './Viewer';
// Sample data
// const data = {
//   pageLoaded: "//iframe[@title='Name of page']",
//   mainIframe: "//iframe[@title='Name of page']",
//   childIframe: "//iframe[@title='Iframe of page']",
//   topLevelSelector: "//div[@id='randomDiv']",
//   sectionSelectors: {
//     name: "//input[@name='fname']",
//     email: "//input[@name='email']",
//     address: {
//       line1: "//input[@name='line1Address']",
//       line2: "//input[@name='line2Address']",
//       city: "//input[@name='cityName']",
//       country: "//input[@name='countryName']",
//     },
//     object: {
//       x: 1,
//     },
//   },
//   abc: true,
//   groupSelectors: [
//     {
//       name: 'Some name',
//       email: 'mail@example.com',
//     },
//     {
//       name: 'Some Other name',
//       email: 'mail@test.com',
//     },
//   ],
// };

const data = [
  {
    title: 'Settings',
    groups: {
      section: [
        [
          {
            heading: 'General',
            group: [
              {
                name: 'About',
                link: 'About',
                group: [
                  {
                    name: 'About',
                    link: 'About',
                    group: [],
                  },
                  {
                    name: 'Software Update',
                    link: null,
                    group: [],
                  },
                  {
                    name: 'iPhone Storage',
                    link: null,
                    group: [],
                  },
                ],
              },
              {
                name: 'Software Update',
                link: null,
                group: [],
              },
              {
                name: 'iPhone Storage',
                link: null,
                group: [],
              },
            ],
          },
          {
            heading: 'Apple Services',
            items: [
              {
                name: 'AppleCare & Warranty',
                link: null,
              },
            ],
          },
          {
            heading: 'Device Settings',
            items: [
              {
                name: 'AirDrop',
                link: null,
              },
              {
                name: 'AirPlay & Continuity',
                link: null,
              },
              {
                name: 'Picture in Picture',
                link: null,
              },
              {
                name: 'CarPlay',
                link: null,
              },
            ],
          },
          {
            name: 'Accessibility',
            link: 'Accessibility',
          },
          {
            name: 'Camera',
            link: null,
          },
          {
            name: 'Control Center',
            link: null,
          },
          {
            name: 'Display & Brightness',
            link: null,
          },
          {
            name: 'Home Screen & App Library',
            link: null,
          },
          {
            name: 'Search',
            link: null,
          },
          {
            name: 'Siri',
            link: null,
          },
          {
            name: 'StandBy',
            link: null,
          },
          {
            name: 'Wallpaper',
            link: null,
          },
          {
            heading: 'Personal Settings',
            items: [
              {
                name: 'AutoFill & Passwords',
                link: null,
              },
              {
                name: 'Background App Refresh',
                link: null,
              },
              {
                name: 'Date & Time',
                link: null,
              },
            ],
          },
          {
            heading: 'Accessibility & Device Options',
          },
        ],
      ],
      'Notifications & Focus': [
        {
          name: 'Notifications',
          link: null,
        },
        {
          name: 'Sounds & Haptics',
          link: null,
        },
        {
          name: 'Focus',
          link: null,
        },
        {
          name: 'Screen Time',
          link: null,
        },
      ],
    },
  },
  {
    title: 'About',
    sections: [
      {
        heading: 'Device Info',
        items: [
          {
            name: 'Name',
            value: "Ahsan's iPhone",
          },
          {
            name: 'iOS Version',
            value: '18.1',
          },
          {
            name: 'Model Name',
            value: 'iPhone 12 mini',
          },
          {
            name: 'Model Number',
            value: 'MGDX3HN/A',
          },
          {
            name: 'Serial Number',
            value: 'C76DVGHX0GPP',
          },
        ],
      },
      {
        heading: 'Coverage',
        items: [
          {
            name: 'Coverage Expired',
            link: null,
          },
          {
            name: 'Parts & Service History',
            link: null,
          },
        ],
      },
      {
        heading: 'Storage Information',
        items: [
          {
            name: 'Songs',
            value: '0',
          },
          {
            name: 'Videos',
            value: '27',
          },
          {
            name: 'Photos',
            value: '872',
          },
          {
            name: 'Applications',
            value: '40',
          },
          {
            name: 'Capacity',
            value: '64 GB',
          },
        ],
      },
    ],
  },
  {
    title: 'Accessibility',
    sections: [
      {
        heading: 'Vision',
        items: [
          {
            name: 'VoiceOver',
            link: null,
          },
          {
            name: 'Zoom',
            link: null,
          },
          {
            name: 'Display & Text Size',
            link: null,
          },
        ],
      },
      {
        heading: 'Physical & Motor',
        items: [
          {
            name: 'Touch',
            link: null,
          },
          {
            name: 'Face ID & Attention',
            link: null,
          },
        ],
      },
      {
        heading: 'Hearing',
        items: [
          {
            name: 'Hearing Devices',
            link: null,
          },
          {
            name: 'Sound Recognition',
            link: null,
          },
        ],
      },
    ],
  },
];
// Main App component
function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <JsonViewer data={data} />
    </div>
  );
}

export default App;
