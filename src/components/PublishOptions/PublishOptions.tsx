import { ComponentSVG } from 'components/ComponentSVG';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';
import { PIM_PRODUCT_DETAIL_FIELD_KEY, AUTHORIZATION_KEY, Storage } from 'aesirx-lib';
import { observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { withUtilsViewModel } from 'store/UtilsStore/UtilsViewModelContextProvider';
import { CustomizedDatePicker } from 'components/CustomizedDatePicker';
import { FormRadio } from 'components/Form/FormRadio';
import { FORMAT_DATE, FORMAT_TIME } from 'constant';
import { FormSelection } from 'components/Form/FormSelection';

const PublishOptionsDetail = observer(
  class PublishOptionsDetail extends Component {
    utilsListViewModel: any = null;
    constructor(props: any) {
      super(props);
      this.utilsListViewModel = props.model.utilsListViewModel;
    }

    async componentDidMount() {
      if (!this.utilsListViewModel?.listPublishStatus.length) {
        await this.utilsListViewModel.getListPublishStatus();
      }
    }
    render() {
      const {
        t,
        detailViewModal,
        formPropsData,
        isEdit,
        isPublished = true,
        isPublishedSimple = false,
        isFeatured = true,
        isLastModified = true,
        isCreateBy = true,
      }: any = this.props;
      const createBy = isEdit
        ? formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.CREATED_USER_NAME]
        : Storage.getItem(AUTHORIZATION_KEY.MEMBER_FULL_NAME);
      const modifiedBy = isEdit
        ? formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.MODIFIED_USER_NAME]
        : Storage.getItem(AUTHORIZATION_KEY.MEMBER_FULL_NAME);
      const listPublishStatus = isPublishedSimple
        ? this.utilsListViewModel?.listPublishStatusSimple
        : this.utilsListViewModel?.listPublishStatus;
      return (
        <div className="p-24 bg-white rounded-1 shadow-sm">
          <h5 className="fw-bold text-body text-uppercase fs-6 border-bottom pb-24 mb-24">
            {t('txt_publish_options')}
          </h5>
          {isPublished && (
            <div className="d-flex align-items-center justify-content-between w-100 mb-24">
              <div>
                <div style={{ marginLeft: '-5px' }}>
                  <ComponentSVG url="/assets/images/post-status.svg" className="bg-dark" />
                  &nbsp;
                  {t('txt_status')}:
                </div>
              </div>

              <Form.Group style={{ maxWidth: '200px', width: '65%' }}>
                <FormSelection
                  field={{
                    getValueSelected:
                      formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.PUBLISHED] !== undefined
                        ? {
                            label: t(
                              `txt_${listPublishStatus
                                ?.find(
                                  (x: any) =>
                                    x.value.toString() ===
                                    formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.PUBLISHED].toString()
                                )
                                ?.label?.toString()
                                .toLowerCase()}`
                            ),
                            value: formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.PUBLISHED].toString(),
                          }
                        : null,
                    getDataSelectOptions: listPublishStatus?.map((status: any) => ({
                      label: t(`txt_${status?.label && status.label?.toString().toLowerCase()}`),
                      value: status.value.toString(),
                    })),
                    arrowColor: 'var(--dropdown-indicator-color)',
                    handleChange: (data: any) => {
                      detailViewModal.handleFormPropsData(
                        PIM_PRODUCT_DETAIL_FIELD_KEY.PUBLISHED,
                        data.value
                      );
                    },
                  }}
                />
              </Form.Group>
            </div>
          )}
          {isLastModified && (
            <div className="d-flex align-items-center justify-content-between w-100 mb-24 border-bottom pb-24">
              <div className="d-flex align-items-center">
                <i className="me-2 mb-1">
                  <FontAwesomeIcon icon={faUser} />
                </i>
                {t('txt_last_modified')}:
              </div>
              <div className="text-gray">{modifiedBy}</div>
            </div>
          )}
          {isFeatured && (
            <div className="d-flex align-items-center justify-content-between w-100 mb-24">
              <div>{t('txt_feature')}</div>
              <Form.Group>
                <FormRadio
                  field={{
                    key: PIM_PRODUCT_DETAIL_FIELD_KEY.FEATURED,
                    getValueSelected: formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.FEATURED]
                      ? {
                          label:
                            formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.FEATURED] === '1'
                              ? t('txt_yes')
                              : 'No',
                          value: formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.FEATURED].toString(),
                        }
                      : {
                          label: 'No',
                          value: '0',
                        },
                    getDataSelectOptions: [
                      {
                        label: t('txt_yes'),
                        value: '1',
                      },
                      {
                        label: t('txt_no'),
                        value: '0',
                        className: 'me-0',
                      },
                    ],
                    handleChange: (data: any) => {
                      detailViewModal.handleFormPropsData(
                        PIM_PRODUCT_DETAIL_FIELD_KEY.FEATURED,
                        data.target.value
                      );
                    },
                  }}
                />
              </Form.Group>
            </div>
          )}
          <div className="d-flex align-items-center justify-content-between w-100 mb-24">
            <div>{t('txt_create_date')}:</div>
            <Form.Group style={{ maxWidth: '200px', width: '65%' }}>
              <div className="fs-14">
                <CustomizedDatePicker
                  dateFormat={FORMAT_DATE + ' ' + FORMAT_TIME}
                  defaultDate={
                    formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.CREATED_TIME]
                      ? formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.CREATED_TIME]
                      : new Date()
                  }
                  isDisabled={true}
                  showTimeSelect={true}
                  isUTC={true}
                />
              </div>
            </Form.Group>
          </div>
          {isCreateBy && (
            <div className="d-flex align-items-center justify-content-between w-100">
              <div>{t('txt_create_by')}:</div>
              <div className="text-gray">{createBy}</div>
            </div>
          )}
        </div>
      );
    }
  }
);
export default withTranslation()(withUtilsViewModel(PublishOptionsDetail));
