import React from 'react';
import './Output.css';

const transformEquationToEnglish = x => {
    var x_return = x.replaceAll('+', 'Plus');
    x_return = x_return.replaceAll('x', 'Multiplied By');
    x_return = x_return.replaceAll('(', 'Open Bracket');
    x_return = x_return.replaceAll(')', 'Close Bracket');
    return x_return;
};

const OutputComponent = (props) => {

    const sectionAriaLabel = `Results${
        props.valid ? '' : ', There Is Currently No Result'}`;

    return (
      <div className="calculator-output">
        <section aria-labelledBy="results">
            <h2 id="results" aria-label={sectionAriaLabel} className="section-header">Results</h2>
                <div className="calculator-output-row">
                    <h3>Read Your Input with Maths Symbols</h3>
                    <p id="output-equation" className="calc-output">{props.output || 'No input received'}</p>
                </div>
                <div className="calculator-output-row">
                    <h3>Read Your Input in English</h3>
                    <p id="output-english" className="calc-output">{props.output ? transformEquationToEnglish(props.output) : 'No input received'}</p>
                </div>
                <div className="calculator-output-row">
                    <h3>Result</h3>
                    <p id="output-result" className="calc-output">{props.valid ? props.value : 'No valid value'}</p>
                    <h3>Reset</h3>
                    <input id="output-reset" type="button" onClick={props.reset} value="Click Here to Reset" />
                </div>
        </section>
        </div>
    );

};

export default OutputComponent;