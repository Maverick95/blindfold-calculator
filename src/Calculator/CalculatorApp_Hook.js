import React, {useState} from 'react';

import EquationStack from 'equation-stack';
import CALCULATOR_HOOK from './Calculator_Hook.js';
import CalculatorOutput from './CalculatorOutput.js';

const calc_states = {
    STATE_START_FIRST: 1,
    STATE_INT_PRESSED_FIRST: 2,
    STATE_END_FIRST: 3,
    STATE_OP_PRESSED: 4,
    STATE_INT_PRESSED_OTHER: 5
};

const CalculatorAppHook = function () {

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

                return { current: current, depth: depth, equation: prevState.equation };

            });
        }
    };
}

export default function CALCULATOR_APP_HOOK() {

    const {state, press} = CalculatorAppHook();

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
        <div>
            <CALCULATOR_HOOK
                number={enabled_number}
                operation={enabled_operation}
                bracket-open={enabled_bracket_open}
                bracket-close={enabled_bracket_close}
                press={press} />
            <CalculatorOutput
                output={state.equation.Output()}
                valid={state.equation.Valid()}
                value={state.equation.Value()} />
        </div>
    );

}