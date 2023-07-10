/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import CreatableSelect from 'react-select/creatable';
import { components } from 'react-select';
import customStyles from './customStyles';
import { withTranslation } from 'react-i18next';
import { SVGComponent } from 'components/SVGComponent';
import { ThemesContext } from 'providers';

class CreatableComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: props.defaultValue ?? [],
      inputValue: '',
    };
  }

  createOption = (label: any) => ({
    label,
    value: label,
  });
  handleKeyDown = async (event: any) => {
    if (!this.state.inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        await this.setState((prevState: any) => {
          return {
            ...prevState,
            inputValue: '',
            value: [...prevState.value, this.createOption(this.state.inputValue)],
          };
        });
        this.props.onChange(this.state.value);

        event.preventDefault();
    }
  };

  render() {
    const { t }: any = this.props;
    const { theme }: any = this.context;
    const { isBorder, placeholder, arrowColor, onChange, size, minWidth }: any = this.props;
    let { plColor }: any = this.props;
    const creatable = true;
    if (theme == 'dark') {
      plColor = '#bfc9f7';
    }
    const styles = customStyles(isBorder, plColor, arrowColor, creatable, size, minWidth);

    const ClearIndicator = (props: any) => {
      const {
        children = <div className="text-danger">{t('txt_remove_all')}</div>,
        getStyles,
        innerProps: { ref, ...restInnerProps },
      } = props;
      return (
        <div
          {...restInnerProps}
          ref={ref}
          style={{
            ...getStyles('clearIndicator', props),
            position: 'absolute',
            top: '-38px',
            right: '0',
            paddingRight: 0,
          }}
        >
          <div style={{ padding: '0px 5px' }}>{children}</div>
        </div>
      );
    };

    const MultiValueRemove = (props: any) => {
      return (
        <components.MultiValueRemove {...props}>
          <SVGComponent url="/assets/images/cancel.svg" color="#C0C0C0" />
        </components.MultiValueRemove>
      );
    };

    return (
      <CreatableSelect
        {...this.props}
        components={{
          ClearIndicator,
          MultiValueRemove,
          DropdownIndicator: null,
        }}
        styles={styles}
        inputValue={this.state.inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        placeholder={placeholder ?? t('txt_type_something_and_press_enter')}
        onChange={(newValue) => {
          onChange(newValue);
          return this.setState((prevState: any) => {
            return {
              ...prevState,
              value: newValue,
            };
          });
        }}
        onInputChange={(newValue) =>
          this.setState((prevState: any) => {
            return {
              ...prevState,
              inputValue: newValue,
            };
          })
        }
        onKeyDown={this.handleKeyDown}
        value={this.state.value}
      />
    );
  }
}

CreatableComponent.contextType = ThemesContext;
export default withTranslation()(CreatableComponent);

const CreatableComponentExtended = withTranslation()(CreatableComponent);

export { CreatableComponentExtended as CreatableComponent };
