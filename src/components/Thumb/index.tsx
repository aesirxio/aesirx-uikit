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
        <div className="col-md-3 mb-4">
          <div className="bg-white rounded-3 p-3">
            <p className="rounded-3 overflow-hidden">
              <img src="./assets/images/annotation.png" alt="" />
            </p>
            <p>
              <span className="px-2 bg-green-light text-green rounded-1 d-inline-block">
                In Progress
              </span>
            </p>
            <h3 className="fs-5 fw-bold">AesirX - Cutting-edge solutions ...</h3>
            <p>
              AesirX is a Privacy-First Security Solution designed specifically for Joomla! and
              WordPress website owners and administrators to protect online users
            </p>
          </div>
        </div>
        {toJS(data).map((item: any) => {
          let status = '';
          if (item.status == 1) {
            status = 'In Progress';
          } else if (item.status == 2) {
            status = 'Pending';
          } else {
            status = 'Failed';
          }
          const classStatus = status.toLowerCase().replace(/\s/g, '');
          return (
            <div className="col-md-3 mb-4 " key={item.id}>
              <div className="bg-white rounded-3 p-3 h-100">
                <p className="rounded-3 overflow-hidden">
                  <Image
                    src={item.logo ? item.logo : './assets/images/annotation.png'}
                    alt={item.name.props.children}
                  />
                </p>
                <p>
                  <span className={`px-2 rounded-1 d-inline-block project__status-${classStatus}`}>
                    {status}
                  </span>
                </p>
                <h3 className="fs-5 fw-bold">{item.name.props.children}</h3>
                <p>{item.shortDescription}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export { Thumb };
