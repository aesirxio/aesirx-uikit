import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

// Define a TypeScript interface for the props
interface ButtonCopyProps {
  content: string;
  className?: string;
}

function ButtonCopy({ content, className }: ButtonCopyProps) {
  const [copy, setCopy] = useState(false);

  const handleCopy = (content: string) => {
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 1500);
    navigator.clipboard.writeText(content);
  };

  return (
    <button
      onClick={() => handleCopy(content)}
      disabled={copy}
      className={`px-1 py-1 fs-12 lh-base font-opensans fw-bold btn btn-success cursor-copy ${className}`}
    >
      {!copy ? (
        <FontAwesomeIcon className="text-body" icon={faCopy} width={16} height={16} />
      ) : (
        'COPIED!'
      )}
    </button>
  );
}

export default ButtonCopy;
