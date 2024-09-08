import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

const ItemViewFooter = ({ modalData, itemActions, appActions, type }) => {
  const { modalEditableText } = modalData;
  const [isSaving, setIsSaving] = useState(false);

  const handleCancel = () => {
    if (type === 'ADD') {
      appActions.switchModal(false);
    } else {
      appActions.switchModal(true, 'VIEW', modalData);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    itemActions.addText().catch(() => setIsSaving(false));
  };

  const isTextModified = !!modalEditableText;

  return (
    <div className="item-view-footer">
      <div className="buttons are-small text-actions">
        <button className="button" title="Cancel" onClick={handleCancel}>
          <span className="icon">
            <FontAwesomeIcon icon={faCoffee} />
          </span>
          <span>Cancel</span>
        </button>
      </div>
      <div className="buttons are-small item-actions">
        <button
          className="button is-info"
          onClick={handleSave}
          disabled={!isTextModified || isSaving}
        >
          <span>Add item</span>
          {isSaving && (
            <span className="icon">
              <FontAwesomeIcon icon={faCoffee} spin />
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default ItemViewFooter;
