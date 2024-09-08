import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faTwitter,
  faPinterest,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';

const ShareBox = () => {
  const url = encodeURIComponent(window.location.href);
  const handleShare = (platform) => {
    console.log(`Share clicked: ${platform}`);
  };

  return (
    <div className="share-box">
      <div className="share-title">Tell about the extension</div>
      <a
        className="resp-sharing-button__link"
        onClick={() => handleShare('facebook')}
        href={`https://facebook.com/sharer/sharer.php?u=${url}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label=""
      >
        <div className="resp-sharing-button resp-sharing-button--facebook resp-sharing-button--small">
          <div
            aria-hidden="true"
            className="resp-sharing-button__icon resp-sharing-button__icon--solid"
          >
            <FontAwesomeIcon icon={faFacebook} />
          </div>
        </div>
      </a>
      <a
        className="resp-sharing-button__link"
        onClick={() => handleShare('twitter')}
        href={`https://twitter.com/intent/tweet/?text=Best%20Clipboard%20History%20extension%20for%20Chrome&amp;url=${url}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label=""
      >
        <div className="resp-sharing-button resp-sharing-button--twitter resp-sharing-button--small">
          <div
            aria-hidden="true"
            className="resp-sharing-button__icon resp-sharing-button__icon--solid"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </div>
        </div>
      </a>
      <a
        className="resp-sharing-button__link"
        onClick={() => handleShare('pinterest')}
        href={`https://pinterest.com/pin/create/button/?url=${url}&amp;media=${url}&amp;description=Best%20Clipboard%20History%20extension%20for%20Chrome`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label=""
      >
        <div className="resp-sharing-button resp-sharing-button--pinterest resp-sharing-button--small">
          <div
            aria-hidden="true"
            className="resp-sharing-button__icon resp-sharing-button__icon--solid"
          >
            <FontAwesomeIcon icon={faPinterest} />
          </div>
        </div>
      </a>
      <a
        className="resp-sharing-button__link"
        onClick={() => handleShare('linkedin')}
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label=""
      >
        <div className="resp-sharing-button resp-sharing-button--linkedin resp-sharing-button--small">
          <div
            aria-hidden="true"
            className="resp-sharing-button__icon resp-sharing-button__icon--solid"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </div>
        </div>
      </a>
    </div>
  );
};

export default ShareBox;
