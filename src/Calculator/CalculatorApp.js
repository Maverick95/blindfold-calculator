import React from 'react';

import EquationStack from 'equation-stack';
import Calculator from './Calculator.js';
import CalculatorOutput from './CalculatorOutput.js';

const calc_states = {
    STATE_START_FIRST: 1,
    STATE_INT_PRESSED_FIRST: 2,
    STATE_END_FIRST: 3,
    STATE_OP_PRESSED: 4,
    STATE_INT_PRESSED_OTHER: 5
};

export default class CalculatorApp extends React.Component {

    constructor(props) {

        super(props);

        this.equation = new EquationStack(); 

        this.state = {
            current: calc_states.STATE_START_FIRST,
            depth: 0
        };

        this.press_number = this.press_number.bind(this);
        this.press_op = this.press_op.bind(this);
        this.press_bracket_open = this.press_bracket_open.bind(this);
        this.press_bracket_close = this.press_bracket_close.bind(this);

    }

    press_number(x) {
        
        this.equation.Add(x);

        this.setState((state) => {

                let state_new = {
                    current: state.current
                };

                switch (state.current) {
                    case calc_states.STATE_START_FIRST:
                        state_new.current = calc_states.STATE_INT_PRESSED_FIRST;
                        break;
                    case calc_states.STATE_OP_PRESSED:
                        state_new.current = calc_states.STATE_INT_PRESSED_OTHER;
                        break;
                        default:
                }

                return state_new;

            });

    }
    
    press_op(x) {

        this.equation.Add(x);

        this.setState((state) => {
            return { current: calc_states.STATE_OP_PRESSED }; });

    }

    press_bracket_open() {
        
        this.equation.Add('(');

        this.setState((state) => {
            return { current: calc_states.STATE_START_FIRST,
            depth: state.depth + 1 };});

    }

    press_bracket_close() {

        this.equation.Add(')');

        this.setState((state) => {
            return { current: calc_states.STATE_END_FIRST,
            depth: state.depth - 1 };});

    }

    enabled_number() {

        return [
            calc_states.STATE_START_FIRST,
            calc_states.STATE_OP_PRESSED
        ].includes(this.state.current);

    }

    enabled_operation() {

        return [
            calc_states.STATE_INT_PRESSED_FIRST,
            calc_states.STATE_END_FIRST,
            calc_states.STATE_INT_PRESSED_OTHER
        ].includes(this.state.current);

    }

    enabled_bracket_open() {

        return [
            calc_states.STATE_START_FIRST,
            calc_states.STATE_OP_PRESSED
        ].includes(this.state.current);

    }

    enabled_bracket_close() {

        return [
            calc_states.STATE_END_FIRST,
            calc_states.STATE_INT_PRESSED_OTHER
         ].includes(this.state.current) &&
        this.state.depth > 0;

    }

    render() {

        return (
        <div>
            <Calculator
            number={this.enabled_number()}
            operation={this.enabled_operation()}
            bracket-open={this.enabled_bracket_open()}
            bracket-close={this.enabled_bracket_close()}
            press_number={this.press_number}
            press_op={this.press_op}
            press_bracket_open={this.press_bracket_open}
            press_bracket_close={this.press_bracket_close} />
            <CalculatorOutput
            output={this.equation.Output()}
            valid={this.equation.Valid()}
            value={this.equation.Value()} />
            </div>
        );

    }

}