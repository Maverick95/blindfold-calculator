import React from 'react';
import './Calculator.css';

export default function CalculatorOutput(props) {

    return (
        <div className="calc">
            <div className="calc-row">
            <div className="calc-output">{props.output || 'No input received'}</div>
            </div>
            <div className="calc-row">
            <div className="calc-output">{props.valid ? 'Computed value : ' + props.value : 'No valid value calculated'}</div>
            </div>
        </div>
    );

}