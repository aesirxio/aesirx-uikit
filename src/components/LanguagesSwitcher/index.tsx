import React from 'react';
import i18n from 'i18next';
import { AesirXSelect } from 'components/Select';
import { useI18nextContext } from 'providers/I18nextProvider';
import { ComponentSVG } from 'components/ComponentSVG';
const LanguagesSwitcher = () => {
  const { listLanguages } = useI18nextContext();

  const currentLanguage = listLanguages.filter((lang: any) => lang.value == i18n.language);

  return (
    <div className="ms-auto me-3 d-flex align-items-center fs-sm">
      <ComponentSVG
        url="/assets/images/language-icon-light.svg"
        color="var(--aesirxui-body-color)"
      />
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
        className="shadow-none"
        onChange={(data: any) => {
          i18n.changeLanguage(data.value);
        }}
        defaultValue={currentLanguage}
        minWidth={120}
        isLanguageSelect={true}
      />
    </div>
  );
};

export { LanguagesSwitcher };
