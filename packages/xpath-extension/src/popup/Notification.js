import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

const Notification = ({
  title,
  message,
  autoClose = true,
  type = 'info',
  dismiss,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const notificationTypes = {
    danger: 'is-danger',
    info: 'is-info',
    success: 'is-success',
    warning: 'is-warning',
  };
  let timer;

  useEffect(() => {
    if (autoClose) {
      timer = setTimeout(() => {
        setIsVisible(false);
        dismiss();
      }, 10000);
    }
    return () => clearTimeout(timer);
  }, [autoClose, dismiss]);

  if (!isVisible || (!title && !message)) return null;

  return (
    <div
      className={classNames(
        'notification app-notification',
        notificationTypes[type]
      )}
    >
      <button
        className="delete"
        onClick={() => {
          setIsVisible(false);
          dismiss();
        }}
      />
      <strong>{title}</strong>
      <div className="is-size-7">{message}</div>
    </div>
  );
};

export default Notification;
