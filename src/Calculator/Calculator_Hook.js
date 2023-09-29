import React from 'react';
import './Calculator.css';

export default function CALCULATOR_HOOK(props) {

    return (
        <div className="calc">

        <div className="calc-row">
            <input className="calc-btn" type="button" value="8" onClick={() => props.press(8)} disabled={!props.number} />
            <input className="calc-btn" type="button" value="9" onClick={() => props.press(9)} disabled={!props.number}  />
        </div>

        <div className="calc-row">
            <input className="calc-btn" type="button" value="6" onClick={() => props.press(6)} disabled={!props.number}  />
            <input className="calc-btn" type="button" value="7" onClick={() => props.press(7)} disabled={!props.number}  />
        </div>

        <div className="calc-row">
            <input className="calc-btn" type="button" value="4" onClick={() => props.press(4)} disabled={!props.number}  />
            <input className="calc-btn" type="button" value="5" onClick={() => props.press(5)} disabled={!props.number}  />
        </div>

        <div className="calc-row">
            <input className="calc-btn" type="button" value="2" onClick={() => props.press(2)} disabled={!props.number}  />
            <input className="calc-btn" type="button" value="3" onClick={() => props.press(3)} disabled={!props.number}  />
        </div>

        <div className="calc-row">
            <input className="calc-btn" type="button" value="0" onClick={() => props.press(0)} disabled={!props.number}  />
            <input className="calc-btn" type="button" value="1" onClick={() => props.press(1)} disabled={!props.number}  />
        </div>

        <div className="calc-row">
            <input className="calc-btn calc-btn-op" type="button" value="+" onClick={() => props.press('+')} disabled={!props.operation} />
            <input className="calc-btn calc-btn-op" type="button" value="x" onClick={() => props.press('x')} disabled={!props.operation} />
        </div>

        <div className="calc-row">
            <input className="calc-btn calc-btn-br" type="button" value="(" onClick={() => props.press('(')} disabled={!props['bracket-open']} />
            <input className="calc-btn calc-btn-br" type="button" value=")" onClick={() => props.press(')')} disabled={!props['bracket-close']}/>
        </div>

    </div>
    );

}