import React from 'react';
import './Interface.css';

const sectionAriaLabel = (value, valid) => `Enter ${value}${
    valid ? '' : ', These Are Currently Disabled'}`;

const buttonAriaLabel = (value, valid) => `${value}${
    valid ? '' : ', Disabled'}`;

const InterfaceComponent = (props) => {

    const inputNumberClasses = `calc-btn${props.number ? '' : ' calc-btn-disabled'}`;
    const operatorClasses = `calc-btn calc-btn-op${props.operation ? '' : '-disabled'}`;
    const openBracketClasses = `calc-btn calc-btn-br${props['bracket-open'] ? '' : '-disabled'}`;
    const closeBracketClasses = `calc-btn calc-btn-br${props['bracket-close'] ? '' : '-disabled'}`;

    const generateOnClick = (value, valid) => () => {
        if (valid) {
            props.press(value);
        }
    };
    
    const getInputNumber = (value) => {

        var inputProps = {
            className: inputNumberClasses,
            type: 'button',
            value: value,
            onClick: generateOnClick(value, props.number),
            'aria-label': buttonAriaLabel(value, props.number),
        };

        if (value === 0) {
            inputProps = {
                ...inputProps,
                //id: 'buttons-numbers',
            };
        }

        return <input {...inputProps} />;
    }

    return (
      <div className="main-calculator">
      <div className="calculator-grid">
        <section aria-labelledBy="numbers" className="calculator-numbers">
          <h2 aria-label={sectionAriaLabel('Number', props.number)} id="numbers" className="section-header">Numbers</h2>
          <div className="calculator-numbers-content">
            <div className="calculator-numbers-column">
              {getInputNumber(0)}
              {getInputNumber(1)}
              {getInputNumber(2)}
              {getInputNumber(3)}
              {getInputNumber(4)}
            </div>
            <div className="calculator-numbers-column">
              {getInputNumber(5)}
              {getInputNumber(6)}
              {getInputNumber(7)}
              {getInputNumber(8)}
              {getInputNumber(9)}

            </div>
          </div>
        </section>
        <section aria-labelledBy="operators" className="calculator-operators">
          <h2 aria-label={sectionAriaLabel('Operator', props.operation)} id="operators" className="section-header">Operators</h2>
          <div className="calculator-numbers-content">
            <div className="calculator-numbers-column">
            <input id="buttons-operators"
              className={operatorClasses}
              type="button"
              aria-label={buttonAriaLabel('Plus', props.operation)}
              value="+"
              onClick={generateOnClick('+', props.operation)}
            />
            <input className={operatorClasses}
              type="button"
              aria-label={buttonAriaLabel('Multiply', props.operation)}
              value="x"
              onClick={generateOnClick('x', props.operation)}
            />
            </div>
          </div>
        </section>
        <section aria-labelledBy="brackets" className="calculator-brackets">
          <h2 aria-label={sectionAriaLabel('Bracket', props['bracket-open'] || props['bracket-close'])} id="brackets" className="section-header">Brackets</h2>
          <div className="calculator-numbers-content">
            <div className="calculator-numbers-column">
            <input id="buttons-bracket-open"
              className={openBracketClasses}
              type="button"
              aria-label={buttonAriaLabel('Open Bracket', props['bracket-open'])}
              value="("
              onClick={generateOnClick('(', props['bracket-open'])}
            />
            <input id="buttons-bracket-close"
              className={closeBracketClasses}
              type="button"
              aria-label={buttonAriaLabel('Close Bracket', props['bracket-close'])}
              value=")"
              onClick={generateOnClick(')', props['bracket-close'])}
            />
          </div>
        </div>
        </section>
      </div>
      </div>
    );

};

export default InterfaceComponent;