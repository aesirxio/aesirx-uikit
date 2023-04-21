import React from 'react';
import i18n from 'i18next';
import { AesirXSelect } from 'components/Select';
import { useI18nextContext } from 'providers/I18nextProvider';
import language from '../../assets/images/language-icon.png';

const LanguagesSwitcher = () => {
  const { listLanguages } = useI18nextContext();

  const currentLanguage = listLanguages.filter((lang: any) => {
    if (lang.value == i18n.language) {
      return lang;
    }
  });

  return (
    <div className="ms-auto d-flex align-items-center">
      <img width={24} height={24} alt="language" src={language} />
      <AesirXSelect
        isClearable={false}
        isSearchable={false}
        isBorder={false}
        isShadow={false}
        options={listLanguages}
        getOptionLabel={(options: any) => (
          <div className="language-option d-flex align-items-center">
            <span>{options.label}</span>
          </div>
        )}
        className="shadow-none select-bg-white"
        onChange={(data: any) => {
          i18n.changeLanguage(data.value);
        }}
        defaultValue={currentLanguage}
      />
    </div>
  );
};

export { LanguagesSwitcher };
