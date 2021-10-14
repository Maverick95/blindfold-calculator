import React, {useState} from 'react';

import EquationStack from 'equation-stack';
import CALCULATOR_ACCESSIBLE_HOOK from './CalculatorAccessible_Hook';
import CalculatorAccessibleOutput from './CalculatorOutputAccessible';
import './CalculatorAppAccessible.css';

const calc_states = {
    STATE_START_FIRST: 1,
    STATE_INT_PRESSED_FIRST: 2,
    STATE_END_FIRST: 3,
    STATE_OP_PRESSED: 4,
    STATE_INT_PRESSED_OTHER: 5
};

const CalculatorAppAccessibleHook = function () {

    const [state, setState] =
        useState({
            current: calc_states.STATE_START_FIRST,
            depth: 0,
            equation: new EquationStack()
        });

    return {
        state: state,
        press: function (x) {

            state.equation.Add(x);

            setState(prevState => {

                let { current, depth } = prevState;

                switch (x) {

                    case '(':
                        current = calc_states.STATE_START_FIRST;
                        depth += 1;
                        break;

                    case ')':
                        current = calc_states.STATE_END_FIRST;
                        depth -= 1;
                        break;

                    case '+': case 'x':
                        current = calc_states.STATE_OP_PRESSED;
                        break;

                    default:
                        {
                            switch (current) {
                                case calc_states.STATE_START_FIRST:
                                    current = calc_states.STATE_INT_PRESSED_FIRST;
                                    break;
                                case calc_states.STATE_OP_PRESSED:
                                    current = calc_states.STATE_INT_PRESSED_OTHER;
                                    break;
                                    default:
                            }
                        }
                }

                return { ...prevState, current, depth, };

            });
        },
        reset: function() {

            state.equation.Reset();
            setState(prevState => ({ ...prevState, current: calc_states.STATE_START_FIRST, depth: 0, }));

        },
    };
}

export default function CALCULATOR_APP_ACCESSIBLE_HOOK() {

    const {state, press, reset} = CalculatorAppAccessibleHook();

    const enabled_number = [
            calc_states.STATE_START_FIRST,
            calc_states.STATE_OP_PRESSED
        ].includes(state.current);

    const enabled_operation = [
            calc_states.STATE_INT_PRESSED_FIRST,
            calc_states.STATE_END_FIRST,
            calc_states.STATE_INT_PRESSED_OTHER
        ].includes(state.current);


    const enabled_bracket_open = [
            calc_states.STATE_START_FIRST,
            calc_states.STATE_OP_PRESSED
        ].includes(state.current);

    const enabled_bracket_close = [
            calc_states.STATE_END_FIRST,
            calc_states.STATE_INT_PRESSED_OTHER
         ].includes(state.current) && state.depth > 0;

    return (
        <main>
          <div className="main-content">
            <section aria-labelledBy="instructions" className="main-instructions">
              <h2 aria-label="Calculator Instructions" id="instructions" className="section-header">Instructions</h2>
              <div className="main-instructions-content">
                <p>Press the Calculator buttons and view your Result.</p>
                <p>There are 4 key sections.</p>
                <p><b>Enter Number</b> contains Numbers 0 to 9.</p>
                <p><b>Enter Operator</b> contains Plus and Multiply.</p>
                <p><b>Enter Bracket</b> contains Open and Close brackets.</p>
                <p><b>Results</b> will read your Result in words, give you the Result, and reset the Calculator.</p>
                <p>Buttons will disable when they cannot be pressed.</p>
                <p>Good luck!</p>
            </div>
            </section>
            <div className="main-calculator">
              <CALCULATOR_ACCESSIBLE_HOOK
                number={enabled_number}
                operation={enabled_operation}
                bracket-open={enabled_bracket_open}
                bracket-close={enabled_bracket_close}
                press={press}
              />
            </div>
          </div>
            <CalculatorAccessibleOutput
                output={state.equation.Output()}
                valid={state.equation.Valid()}
                value={state.equation.Value()}
                reset={reset} />
          
        </main>
    );

}