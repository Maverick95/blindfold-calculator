import React from 'react';
import './Interface.css';

const sectionAriaLabel = (value, valid) => `Enter ${value}${
    valid ? '' : ', These Are Currently Disabled'}`;

const buttonAriaLabel = (value, valid) => `${value}${
    valid ? '' : ', Disabled'}`;

interface IProps {
  enableNumbers: boolean,
  enableOperators: boolean,
  enableOpenBracket: boolean,
  enableCloseBracket: boolean,
  onPress: (value: string | number) => void,
}

const InterfaceComponent: React.FC<IProps> = ({
  enableNumbers,
  enableOperators,
  enableOpenBracket,
  enableCloseBracket,
  onPress}) => {

    const numberClasses = `calc-btn${enableNumbers ? '' : ' calc-btn-disabled'}`;
    const operatorClasses = `calc-btn calc-btn-op${enableOperators ? '' : '-disabled'}`;
    const openBracketClasses = `calc-btn calc-btn-br${enableOpenBracket ? '' : '-disabled'}`;
    const closeBracketClasses = `calc-btn calc-btn-br${enableCloseBracket ? '' : '-disabled'}`;

    const createOnClick = (value, valid) => () => {
        if (valid) { onPress(value); }
    };
    
    const createInput = (
      classes: string,
      value: string | number,
      enabled: boolean,
      label: string | number = value) => {

        var inputProps = {
            className: classes,
            type: 'button',
            value: value,
            onClick: createOnClick(value, enabled),
            'aria-label': buttonAriaLabel(label, enabled),
        };

        return <input {...inputProps} />;

    }

    return (
      <div className="main-calculator">
      <div className="calculator-grid">
        <section aria-labelledBy="numbers" className="calculator-numbers">
          <h2 aria-label={sectionAriaLabel('Number', enableNumbers)} id="numbers" className="section-header">Numbers</h2>
          <div className="calculator-numbers-content">
            <div className="calculator-numbers-column">
              {createInput(numberClasses, 0, enableNumbers)}
              {createInput(numberClasses, 1, enableNumbers)}
              {createInput(numberClasses, 2, enableNumbers)}
              {createInput(numberClasses, 3, enableNumbers)}
              {createInput(numberClasses, 4, enableNumbers)}
            </div>
            <div className="calculator-numbers-column">
              {createInput(numberClasses, 5, enableNumbers)}
              {createInput(numberClasses, 6, enableNumbers)}
              {createInput(numberClasses, 7, enableNumbers)}
              {createInput(numberClasses, 8, enableNumbers)}
              {createInput(numberClasses, 9, enableNumbers)}
            </div>
          </div>
        </section>
        <section aria-labelledBy="operators" className="calculator-operators">
          <h2 aria-label={sectionAriaLabel('Operator', enableOperators)} id="operators" className="section-header">Operators</h2>
          <div className="calculator-numbers-content">
            <div className="calculator-numbers-column">
              {createInput(operatorClasses, '+', enableOperators, 'Plus')}
              {createInput(operatorClasses, 'x', enableOperators, 'Times')}
            </div>
          </div>
        </section>
        <section aria-labelledBy="brackets" className="calculator-brackets">
          <h2 aria-label={sectionAriaLabel('Bracket', enableOpenBracket || enableCloseBracket)} id="brackets" className="section-header">Brackets</h2>
          <div className="calculator-numbers-content">
            <div className="calculator-numbers-column">
              {createInput(openBracketClasses, '(', enableOpenBracket)}
              {createInput(closeBracketClasses, ')', enableCloseBracket)}
          </div>
        </div>
        </section>
      </div>
      </div>
    );

};

export default InterfaceComponent;