import CreateMarkup from '../../components/CreateMarkup';
import { faCheck, faChevronDown, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import TooltipNote from './TooltipNote';

const CollapseItems = ({ list }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div onClick={() => setOpen(!open)} className="d-flex mb-2 justify-content-between fw-medium">
        See feature highlights{' '}
        <FontAwesomeIcon className="text-success" width={16} height={16} icon={faChevronDown} />
      </div>
      <Collapse in={open}>
        <div>
          {list?.map((item: any, index: number) => {
            return (
              <div
                key={index}
                className={`${
                  index && 'border-top'
                } d-flex align-items-center py-10px justify-content-between`}
              >
                <div className="me-3">
                  <CreateMarkup className={'me-2'} htmlString={item?.title} />
                  {item?.noted && <TooltipNote content={item?.noted} />}
                </div>
                {item?.content === 'true' ? (
                  <FontAwesomeIcon className="text-success" width={16} height={16} icon={faCheck} />
                ) : item?.content === 'false' ? (
                  <FontAwesomeIcon className="text-danger" width={16} height={16} icon={faXmark} />
                ) : (
                  <CreateMarkup className={'text-end text-nowrap'} htmlString={item?.content} />
                )}
              </div>
            );
          })}
        </div>
      </Collapse>
    </>
  );
};

export default CollapseItems;
