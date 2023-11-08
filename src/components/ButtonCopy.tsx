import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons/faCopy';
import { useState } from 'react';

function ButtonCopy({ content, className, text, isReplaceClass }: any) {
  const [copy, setCopy] = useState(false);
  const handleCopy = (content: any) => {
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 1500);
    navigator.clipboard.writeText(content);
  };
  const customClass = isReplaceClass
    ? className
    : `rounded-1 fs-8 lh-base font-opensans fw-bold text-body cursor-copy ${className}`;
  return (
    <button onClick={() => handleCopy(content)} disabled={copy} className={customClass}>
      {!copy ? (
        <>
          {text} <FontAwesomeIcon icon={faCopy} width={16} height={16} />
        </>
      ) : (
        'COPIED!'
      )}
    </button>
  );
}

export default ButtonCopy;
