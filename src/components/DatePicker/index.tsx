import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DatePicker, { registerLocale } from 'react-datepicker';
import moment from 'moment';
import vi from 'date-fns/locale/vi';
import de from 'date-fns/locale/de';
import uk from 'date-fns/locale/uk';
import es from 'date-fns/locale/es';
import th from 'date-fns/locale/th';
import hr from 'date-fns/locale/hr';
import { enUS } from 'date-fns/locale';
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

registerLocale('vi', vi);
registerLocale('de', de);
registerLocale('uk', uk);
registerLocale('es', es);
registerLocale('th', th);
registerLocale('hr', hr);
registerLocale('en-US', enUS);

const AesirXDatePicker = ({
  isOpen,
  setIsOpen,
  datePickerRef,
  isDays,
  onChange,
  dateStart,
  dateEnd,
  setDateFilter,
  placeholder,
  classContainer,
  icon,
  inputClass
}: any) => {
  const { t, i18n } = useTranslation();

  const [dateRange, setDateRange] = useState([
    dateStart ? moment(dateStart, 'YYYY-MM-DD').toDate() : null,
    dateEnd ? moment(dateEnd, 'YYYY-MM-DD').toDate() : null,
  ]);

  const [startDate, endDate] = dateRange;
  const pickerRef = useRef(null);

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutSide);
    return () => window.removeEventListener('mousedown', handleClickOutSide);
  });

  const handleApply = async (e: any, startDate: any, endDate: any) => {
    e.stopPropagation();
    onChange(startDate, endDate);
    setIsOpen(false);
    setDateFilter(startDate, endDate);
  };

  const handleClickOutSide = (event: any) => {
    const currentRef = datePickerRef ?? pickerRef;
    if (isOpen && !currentRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleOpenDatePicker = (event: any) => {
    const current: any = pickerRef.current;
    if (isOpen && current && !current.contains(event.target)) {
      setIsOpen(false);
    } else setIsOpen(true);
  };

  const MyContainer = ({ className, children }: any) => {
    return (
      <div
        ref={pickerRef}
        className="rounded-3 shadow overflow-hidden py-2 px-1 bg-white react-datepicker-popper-wrapper"
      >
        <div className={`${className}`}>{children}</div>
        {startDate && (
          <div className="d-flex align-items-center justify-content-end border-top-1 pt-2 px-2">
            <p className="fs-14 opacity-75 mb-0">
              {startDate ? moment(startDate).format('LL') : ''} -{' '}
              {endDate ? moment(endDate).format('LL') : ''}
            </p>
            <span
              style={{ cursor: 'pointer' }}
              className="btn btn-success ms-3 fw-bold text-uppercase fs-14 lh-sm rounded-1 py-2"
              onClick={(e) => handleApply(e, startDate, endDate)}
            >
              {t('txt_apply')}
            </span>
          </div>
        )}
      </div>
    );
  };

  const getDateDiff = (start: any, end: any) => {
    if (!start || !end) return 0;
    return moment(end).diff(moment(start), 'days') + 1;
  };

  const getDateDiffString = (start: any, end: any) => {
    const startDate = start ? moment(start).format('DD MMM, YYYY') : '';
    const endDate = end ? moment(end).format('DD MMM, YYYY') : '';
    let result = '';
    if (start || end) {
      result =
        getDateDiff(start, end) == 1
          ? startDate !== moment().format('DD MMM, YYYY')
            ? startDate
            : t('txt_today')
          : startDate + ` ${endDate ? '-' : ''} ` + endDate;
    }
    return result;
  };
  return (
    <div
      style={{ minHeight: classContainer ? '' : '50px' }}
      ref={datePickerRef}
      className="d-flex align-items-center bg-white rounded-1 shadow-sm daterange-picker-wrapper"
    >
      <div
        onClick={handleOpenDatePicker}
        className={`position-relative daterange-picker w-100 ${classContainer}`}
      >
        <DatePicker
          dateFormat="dd MMM, yyyy"
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={(update: any) => {
            setDateRange(update);
          }}
          value={
            startDate && endDate
              ? !isDays
                ? getDateDiffString(startDate, endDate)
                : getDateDiff(startDate, endDate)
                ? `${getDateDiff(startDate, endDate)} ${t('txt_days')}`
                : ''
              : placeholder
          }
          isClearable={false}
          className={`${
            isDays ? 'fs-14 fw-semibold mw-120' : 'ps-16 pe-6'
          } form-control rounded-1 text-body opacity-100 h-100 ${i18n?.language} ${inputClass}`}
          showPopperArrow={false}
          monthsShown={2}
          open={isOpen}
          locale={i18n.language}
          calendarContainer={MyContainer}
        />
        {
          icon && (
            <i className="text-green">
              <FontAwesomeIcon icon={faChevronDown} />
            </i>
          )
        }
      </div>
    </div>
  );
};

export { AesirXDatePicker };
