import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactNode } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Placement } from 'react-bootstrap/esm/types';

interface Props {
  placement?: Placement;
  content: ReactNode | string;
  className?: string;
  isClick?: Boolean;
}

const TooltipNote = ({ placement, content, className, isClick }: Props) => {
  return (
    <OverlayTrigger
      trigger={isClick ? 'click' : ['hover', 'focus']}
      placement={placement}
      overlay={<Tooltip>{content}</Tooltip>}
    >
      <FontAwesomeIcon
        icon={faCircleInfo}
        className={className ? className : 'text-success'}
        width={16}
        height={16}
      />
    </OverlayTrigger>
  );
};

export default TooltipNote;
