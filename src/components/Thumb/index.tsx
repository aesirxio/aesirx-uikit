import { toJS } from 'mobx';
import React from 'react';
import './index.scss';
import { withTranslation, useTranslation } from 'react-i18next';

interface ThumbType {
  data: any;
}

const Thumb: React.FC<ThumbType> = ({ data }) => {
  const { t } = useTranslation();
  return (
    <section className="px-3 pt-3">
      <div className="row">
        {toJS(data).map((item: any) => {
          let status = '';
          if (item.status === 1) {
            status = t('txt_running');
          } else if (item.status === 2) {
            status = t('txt_schedule');
          } else {
            status = t('txt_stop');
          }

          return (
            <div className="col-md-3 mb-4 " key={item.id}>
              <div className="bg-white rounded-3 p-3 overflow-y-hidden h-100">
                <p>{item.logo}</p>
                <p>
                  <span
                    className={`px-2 fs-14 rounded-1 d-inline-block ${
                      status === t('txt_running')
                        ? 'badge bg-posted mw-50 h-20 d-inline align-middle'
                        : status === t('txt_schedule')
                        ? 'badge bg-processing mw-50 h-20 d-inline align-middle'
                        : 'badge bg-failed mw-50 h-20 d-inline align-middle'
                    }`}
                  >
                    {status}
                  </span>
                </p>
                <h3 className=" text-name fs-5 fw-bold">{item.name.props.children}</h3>
                <p className="text-description">{item.shortDescription}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const ThumbWithTranslation = withTranslation()(Thumb);
export { ThumbWithTranslation as Thumb };
