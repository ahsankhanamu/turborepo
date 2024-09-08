// EvaluationBox.js
import React from 'react';
import { usePlaygroundContext } from './PlaygroundContext';

const EvaluationBox = () => {
  const { selector, setSelector, inputHasFocus, setInputHasFocus } = usePlaygroundContext();

  const handleKeyUp = (event) => {
    // Implement the key up handler
  };

  const handleKeyDown = (event) => {
    // Implement the key down handler
  };

  const copyValueToClipboard = () => {
    // Implement the copy to clipboard function
  };

  const sendSelectorToApp = () => {
    // Implement the send selector to app function
  };

  const inspectNext = () => {
    // Implement the inspect next function
  };

  const inspectPrevious = () => {
    // Implement the inspect previous function
  };

  const submitButton = () => {
    // Implement the submit button function
  };

  const handleXButton = (event) => {
    // Implement the handle X button function
  };

  return (
    <div className="evaluation-box">
      <div className="evaluation-box__controls">
        <select
          className="dropdown-box"
          value={selector.forcedStrategy}
          onChange={(e) => setSelector({ ...selector, forcedStrategy: e.target.value })}
        >
          {selector.selectorOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="evaluation-box__control-divider"></div>
        <span className="evaluation-box__history">
          <button
            disabled={
              !selector.currentHistoryIndex ||
              (selector.currentHistoryIndex === 0 &&
                !selector.history[selector.currentHistoryIndex])
            }
            className="evaluation-box__btn-history-back"
            onClick={() => {}}
            title="Go back"
          ></button>
          <button
            disabled={
              !selector.currentHistoryIndex ||
              selector.currentHistoryIndex === selector.history.length - 1 ||
              selector.history[selector.currentHistoryIndex]
            }
            className="evaluation-box__btn-history-forward"
            onClick={() => {}}
            title="Go forward"
          ></button>
        </span>
        <div className="evaluation-box__control-divider"></div>
        <button
          className="evaluation-box__btn-copy"
          onClick={copyValueToClipboard}
          disabled={!selector.selector || selector.selector.length <= 0}
          title="Copy selector to clipboard"
        ></button>
        <button
          className="evaluation-box__send-to-app"
          onClick={sendSelectorToApp}
          disabled={!selector.selector || selector.selector.length <= 0}
          title="Send selector to Ranorex Webtestit"
        ></button>
        <div className="evaluation-box__control-divider"></div>
        <span className="evaluation-box__count">
          <button
            disabled={selector.numberOfFoundElements <= 1}
            onClick={inspectNext}
            title="Next element"
            className="evaluation-box__btn-cycle-up"
          ></button>
          <span
            title="Number of elements found"
            className="evaluation-box__current evaluation-box__count--green"
          >
            {selector.numberOfFoundElements}
          </span>
          <button
            disabled={selector.numberOfFoundElements <= 1}
            onClick={inspectPrevious}
            title="Previous element"
            className="evaluation-box__btn-cycle-down"
          ></button>
          <div className="evaluation-box__control-label">Found:</div>
        </span>
      </div>
      <div className="toolbar-input toolbar-item evaluation-box__input-wrapper">
        <input
          type="search"
          className="evaluation-box__input"
          onKeyUp={handleKeyUp}
          onKeyDown={handleKeyDown}
          value={selector.selector}
          onChange={(e) => setSelector({ ...selector, selector: e.target.value })}
          placeholder="Enter selector"
          onFocus={() => setInputHasFocus(true)}
          onBlur={() => setInputHasFocus(false)}
          onClick={handleXButton}
          spellCheck="false"
        />
        <div className="evaluation-box__input-divider">&nbsp;</div>
        <button
          title="Test selector"
          onClick={submitButton}
          className="evaluation-box__btn-submit evaluation-box__btn-submit--active"
        ></button>
      </div>
      <div className="evaluation-box__row">
        <button
          onClick={sendSelectorToApp}
          disabled={!selector.selector || selector.selector.length <= 0}
          title="Send selector to Ranorex Webtestit"
          className="evaluation-box__btn-send"
        >
          <img src="images/icons/send-to-app-light.svg" alt="send to app icon" />
          Send to Ranorex Webtestit
        </button>
      </div>
    </div>
  );
};

export default EvaluationBox;
