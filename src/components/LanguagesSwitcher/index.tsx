import React from 'react';
import i18n from 'i18next';
import { AesirXSelect } from 'components/Select';
import { useI18nextContext } from 'providers/I18nextProvider';
import language from '../../assets/images/language-icon-light.svg';
import languageDark from '../../assets/images/language-icon-dark.svg';
import { useThemeContext } from 'providers';

const LanguagesSwitcher = () => {
  const { listLanguages } = useI18nextContext();
  const { theme } = useThemeContext();

  const currentLanguage = listLanguages.filter((lang: any) => lang.value == i18n.language);

  return (
    <div className="ms-auto d-flex align-items-center">
      <img width={24} height={24} alt="language" src={theme === 'dark' ? languageDark : language} />
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
