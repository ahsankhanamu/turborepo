import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { WithContext as ReactTags } from 'react-tag-input';

const ItemViewBody = ({ modalData, settings, itemActions, appActions }) => {
  const { text, tags = [], dateAdded, sourceUrl, textShortcut } = modalData;
  const { itemViewShowWhitespaces, itemViewBreakText, itemViewFontSizePx } =
    settings;
  const [editableText, setEditableText] = useState(text || '');
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleTextChange = (e) => {
    setEditableText(e.target.value);
    appActions.appendModalData({ modalEditableText: e.target.value });
  };

  const handleSave = () => {
    itemActions.editItem(false);
  };

  const handleSaveAsNew = () => {
    itemActions.editItem(true);
  };

  const fontSize = (itemViewFontSizePx || 14) + 'px';
  const breakText = itemViewBreakText ? 'break-text' : '';

  return (
    <div className="item-view-body">
      <div className={classNames('raw-text is-flex', breakText)}>
        <textarea
          className="edit-textarea"
          ref={inputRef}
          style={{ fontSize }}
          value={editableText}
          onChange={handleTextChange}
        />
        <div className="add-item-footer">
          <div className="add-action">
            <label>Save to:</label>
            <div className="select is-small">
              <select
                onChange={(e) =>
                  appActions.appendModalData({ saveTo: e.target.value })
                }
                value={settings.saveTo || 'ALL'}
              >
                <option value="ALL">All</option>
                <option value="FAV">Favorites</option>
                <option value="CLOUD_PRO">Cloud Pro</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemViewBody;
