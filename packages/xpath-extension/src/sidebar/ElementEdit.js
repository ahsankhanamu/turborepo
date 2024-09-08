// ElementEdit.js
import React from 'react';
import { usePlaygroundContext } from './PlaygroundContext';

const ElementEdit = () => {
  const { selector, setSelector } = usePlaygroundContext();

  return (
    <div className="element-edit" style={{ display: 'block' }}>
      <div className="element-edit__container">
        <img
          className="element-edit__icon"
          src="../../images/icons/icon-element.svg"
          alt="element icon"
        />
        <span className="element-edit__name"></span>
        <a
          href="#"
          className="element-edit__cancel"
          onClick={() => setSelector({ ...selector, currentElement: null })}
        >
          <div>Cancel</div>
        </a>
      </div>
    </div>
  );
};

export default ElementEdit;
