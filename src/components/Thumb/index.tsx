import { toJS } from 'mobx';
import React from 'react';
import { Image } from '../Image';
import './index.scss';

interface ThumbType {
  data: any;
}
const Thumb: React.FC<ThumbType> = ({ data }) => {
  return (
    <section className="px-3 pt-3">
      <div className="row">
        {toJS(data).map((item: any) => {
          let status = '';
          if (item.status == 1) {
            status = 'Running';
          } else if (item.status == 2) {
            status = 'Schedule';
          } else {
            status = 'Stop';
          }
          const classStatus = status.toLowerCase().replace(/\s/g, '');
          return (
            <div className="col-md-3 mb-4 " key={item.id}>
              <div className="bg-white rounded-3 p-3 overflow-y-hidden mh-350px">
                <p>{item.logo}</p>
                <p>
                  <span className={`px-2 fs-14 rounded-1 d-inline-block project__status-${classStatus}`}>
                    {status}
                  </span>
                </p>
                <h3 className=" text-name fs-5 fw-bold">{item.name.props.children}</h3>
                <p className="text-description overflow-hidden h-100px">{item.shortDescription}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export { Thumb };
