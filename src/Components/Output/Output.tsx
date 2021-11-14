import React from 'react';
import './Output.css';
import { transformEquationToEnglish, CalculatorInput } from '../../Helpers/Helpers';
import { CALCULATOR_ACTION_RESET } from '../../Hooks/useCalculator/useCalculator';

interface IProps {
    output: string,
    valid: boolean,
    value: number,
    lastPressed: string | number,
    onPress: (value: string | number) => void,
};

const OutputComponent: React.FC<IProps> = ({ output, valid, value, lastPressed, onPress }) => {

    const sectionHeaderResult = `Results${valid ? '' : ', There Is Currently No Result'}`;
    const outputEquation = output || 'No input received';
    const outputEquationEnglish = output ? transformEquationToEnglish(output) : 'No input received';
    const outputValue = valid ? value : 'No valid value';

    return (
        <div className="calculator-output">
            <h2 className="section-header">Results</h2>
            <section aria-labelledby="section-header-input-symbols" className="calculator-output-row">
                <h3 id="section-header-input-symbols">Read Your Input with Maths Symbols</h3>
                <p className="calc-output">{outputEquation}</p>
            </section>
            <section aria-labelledby="section-header-input-english" className="calculator-output-row">
                <h3 id="section-header-input-english">Read Your Input in English</h3>
                <p className="calc-output">{outputEquationEnglish}</p>
            </section>
            <div className="calculator-output-row">
                <section aria-label={sectionHeaderResult} style={{ 'flex': '1 1 0', display: 'flex' }}>
                    <h3>Result</h3>
                    <p className="calc-output">{outputValue}</p>
                </section>
                <section aria-labelledby="section-header-reset" style={{ 'flex': '1 1 0', display: 'flex' }}>
                    <h3 id="section-header-reset">Reset</h3>
                    <CalculatorInput
                        value="Click Here to Reset"
                        codeValue={CALCULATOR_ACTION_RESET}
                        codeLastPressed={lastPressed}
                        enabled
                        onPress={onPress}
                    />
                </section>
            </div>
        </div>
    );

};

export default OutputComponent;