import { createRoot } from 'react-dom/client';
import React from 'react';
import Notification from './Notification';
import ShareBox from './ShareBox';
import ItemViewBody from './ItemViewBody';
import ItemViewFooter from './ItemViewFooter';

// function Popup() {
//   useEffect(() => {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const generateXPathClickHandler = () => {
//       chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//         chrome.scripting.executeScript(
//           {
//             target: { tabId: tabs[0].id },
//             function: generateXPath,
//           },
//           (results) => {
//             document.getElementById('output').textContent = results[0].result;
//           }
//         );
//       });
//     };
//     document
//       .getElementById('generate-xpath')
//       .addEventListener('click', generateXPathClickHandler, { signal });

//     return () => {
//       controller.abort();
//     };
//   }, []);
//   function generateXPath() {
//     const element = document.activeElement;
//     if (element.id !== '') {
//       return 'id("' + element.id + '")';
//     }
//     if (element === document.body) {
//       return element.tagName;
//     }

//     let ix = 0;
//     const siblings = element.parentNode.childNodes;
//     for (let i = 0; i < siblings.length; i++) {
//       const sibling = siblings[i];
//       if (sibling === element) {
//         return (
//           generateXPath(element.parentNode) +
//           '/' +
//           element.tagName +
//           '[' +
//           (ix + 1) +
//           ']'
//         );
//       }
//       if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
//         ix++;
//       }
//     }
//   }

//   return <></>;
// }

const Popup = () => {
  return (
    <div>
      <Notification
        title="Sample Title"
        message="Sample Message"
        dismiss={() => console.log('Dismissed')}
      />
      <ShareBox />
      <ItemViewBody
        modalData={{}}
        settings={{}}
        itemActions={{}}
        appActions={{}}
      />
      <ItemViewFooter
        modalData={{}}
        itemActions={{}}
        appActions={{}}
        type="ADD"
      />
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Popup />);
