import React from 'react';
import { CalculatorState, useCalculator } from '../../Hooks/useCalculator/useCalculator';
import Instructions from '../Instructions/Instructions';
import Interface from '../Interface/Interface';
import Output from '../Output/Output';
import './Calculator.css';

const Calculator: React.FC = () => {

    const {
        current,
        depth,
        output,
        valid,
        value,
        onPress,
        onReset,
    } = useCalculator();

    const enableNumbers = [
        CalculatorState.START_FIRST,
        CalculatorState.OP_PRESSED
    ].includes(current);

    const enableOperators = [
        CalculatorState.INT_PRESSED_FIRST,
        CalculatorState.END_FIRST,
        CalculatorState.INT_PRESSED_OTHER
    ].includes(current);

    const enableOpenBracket = [
        CalculatorState.START_FIRST,
        CalculatorState.OP_PRESSED
    ].includes(current);

    const enableCloseBracket = [
        CalculatorState.END_FIRST,
        CalculatorState.INT_PRESSED_OTHER
    ].includes(current) && depth > 0;

    return (
        <main>
            <div className="main-content">
                <div className="main-instructions-wrapper">
                    <Instructions />
                </div>
                <div className="main-calculator-wrapper">
                    <Interface
                        {...{
                            enableNumbers, enableOperators, enableOpenBracket,
                            enableCloseBracket, onPress,
                        }} />
                </div>
            </div>
            <Output
                {...{ output, valid, value, onReset }} />
        </main>
    );

};

export default Calculator;