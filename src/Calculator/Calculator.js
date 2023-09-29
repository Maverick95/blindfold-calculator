import React from 'react';
import './Calculator.css';

export default function Calculator(props) {

    const press_number_unique = function(x) {
        return () => { props.press_number(x); }
    };

    const press_op_unique = function(x) {
        return () => { props.press_op(x); }
    }

    return (
        <div className="calc">

        <div className="calc-row">
            <input className="calc-btn" type="button" value="8" onClick={press_number_unique(8)} disabled={!props.number} />
            <input className="calc-btn" type="button" value="9" onClick={press_number_unique(9)} disabled={!props.number}  />
        </div>

        <div className="calc-row">
            <input className="calc-btn" type="button" value="6" onClick={press_number_unique(6)} disabled={!props.number}  />
            <input className="calc-btn" type="button" value="7" onClick={press_number_unique(7)} disabled={!props.number}  />
        </div>

        <div className="calc-row">
            <input className="calc-btn" type="button" value="4" onClick={press_number_unique(4)} disabled={!props.number}  />
            <input className="calc-btn" type="button" value="5" onClick={press_number_unique(5)} disabled={!props.number}  />
        </div>

        <div className="calc-row">
            <input className="calc-btn" type="button" value="2" onClick={press_number_unique(2)} disabled={!props.number}  />
            <input className="calc-btn" type="button" value="3" onClick={press_number_unique(3)} disabled={!props.number}  />
        </div>

        <div className="calc-row">
            <input className="calc-btn" type="button" value="0" onClick={press_number_unique(0)} disabled={!props.number}  />
            <input className="calc-btn" type="button" value="1" onClick={press_number_unique(1)} disabled={!props.number}  />
        </div>

        <div className="calc-row">
            <input className="calc-btn calc-btn-op" type="button" value="+" onClick={press_op_unique('+')} disabled={!props.operation} />
            <input className="calc-btn calc-btn-op" type="button" value="x" onClick={press_op_unique('x')} disabled={!props.operation} />
        </div>

        <div className="calc-row">
            <input className="calc-btn calc-btn-br" type="button" value="(" onClick={props.press_bracket_open} disabled={!props['bracket-open']} />
            <input className="calc-btn calc-btn-br" type="button" value=")" onClick={props.press_bracket_close} disabled={!props['bracket-close']}/>
        </div>

    </div>
    );

}