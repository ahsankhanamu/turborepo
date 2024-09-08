// PlaygroundMain.js
import React from 'react';
import { PlaygroundProvider } from './PlaygroundContext';
import EvaluationBox from './EvaluationBox';
import ElementEdit from './ElementEdit';

const PlaygroundMain = ({ state }) => {
  return (
    <PlaygroundProvider>
      <div className="playground-main">
        <div className="playground-main__title">Modify and test selector</div>
        {!state.isDebugMode ? (
          <p className="playground-main__description">
            Enter your selector, modify it, and hit enter to test it.
          </p>
        ) : (
          <p className="playground-main__description" style={{ display: 'block' }}>
            Modify it, test it and send the updated selector directly back to Ranorex Webtestit.
          </p>
        )}
        {state.currentElement && <ElementEdit />}
        <EvaluationBox />
        <div className="notification-box">{/* Implement notification logic */}</div>
      </div>
    </PlaygroundProvider>
  );
};

export default PlaygroundMain;
