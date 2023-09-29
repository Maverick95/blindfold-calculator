import React from 'react';
import './Interface.css';
import { SectionContentType, createSectionAriaLabel, CalculatorInput } from '../../Helpers/Helpers';

interface IProps {
  enableNumbers: boolean,
  enableOperators: boolean,
  enableOpenBracket: boolean,
  enableCloseBracket: boolean,
  lastPressed: string | number,
  onPress: (value: string) => void,
}

const InterfaceComponent: React.FC<IProps> = ({
  enableNumbers,
  enableOperators,
  enableOpenBracket,
  enableCloseBracket,
  lastPressed,
  onPress}) => {

    const commonProps = {
      codeLastPressed: lastPressed,
      onPress,
    };

    const numberProps = {
      ...commonProps,
      enabled: enableNumbers,
      className: `calc-btn${enableNumbers ? '' : ' calc-btn-disabled'}`,
    };

    const operatorProps = {
      ...commonProps,
      enabled: enableOperators,
      className: `calc-btn calc-btn-op${enableOperators ? '' : '-disabled'}`
    };

    const openBracketProps = {
      ...commonProps,
      value: '(',
      enabled: enableOpenBracket,
      className: `calc-btn calc-btn-br${enableOpenBracket ? '' : '-disabled'}`
    };

    const closeBracketProps = {
      ...commonProps,
      value: ')',
      enabled: enableCloseBracket,
      className: `calc-btn calc-btn-br${enableCloseBracket ? '' : '-disabled'}`
    };

    const labelNumbers = createSectionAriaLabel('Enter Number', SectionContentType.BUTTONS, enableNumbers);
    const labelOperators = createSectionAriaLabel('Enter Operator', SectionContentType.BUTTONS, enableOperators);
    const labelBrackets = createSectionAriaLabel('Enter Bracket', SectionContentType.BUTTONS, enableOpenBracket || enableCloseBracket);
    
    return (
      <div className="main-calculator">
      <div className="calculator-grid">
        <section aria-labelledby="numbers" className="calculator-numbers">
          <h2 aria-label={labelNumbers} id="numbers" className="section-header">Numbers</h2>
          <div className="calculator-numbers-content">
            <div className="calculator-numbers-column">
              <CalculatorInput value={0} {...numberProps} />
              <CalculatorInput value={1} {...numberProps} />
              <CalculatorInput value={2} {...numberProps} />
              <CalculatorInput value={3} {...numberProps} />
              <CalculatorInput value={4} {...numberProps} />
            </div>
            <div className="calculator-numbers-column">
              <CalculatorInput value={5} {...numberProps} />
              <CalculatorInput value={6} {...numberProps} />
              <CalculatorInput value={7} {...numberProps} />
              <CalculatorInput value={8} {...numberProps} />
              <CalculatorInput value={9} {...numberProps} />
            </div>
          </div>
        </section>
        <section aria-labelledby="operators" className="calculator-operators">
          <h2 aria-label={labelOperators} id="operators" className="section-header">Operators</h2>
          <div className="calculator-numbers-content">
            <div className="calculator-numbers-column">
              <CalculatorInput value="+" label="Plus" {...operatorProps} />
              <CalculatorInput value="x" label="Times" {...operatorProps} />
            </div>
          </div>
        </section>
        <section aria-labelledby="brackets" className="calculator-brackets">
          <h2 aria-label={labelBrackets} id="brackets" className="section-header">Brackets</h2>
          <div className="calculator-numbers-content">
            <div className="calculator-numbers-column">
              <CalculatorInput {...openBracketProps} />
              <CalculatorInput {...closeBracketProps} />
          </div>
        </div>
        </section>
      </div>
      </div>
    );

};

export default InterfaceComponent;