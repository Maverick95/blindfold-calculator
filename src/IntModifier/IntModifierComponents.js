import {IntModifierContext} from './IntModifierContext.js';
import {IntModifierHook} from './IntModifierHook.js';
import './IntModifier.css';
import {useContext} from 'react';

export const IntModifier = function(props) {

    const {IntValue, value, add} = IntModifierHook();

    return (
                <IntModifierContext.Provider value={{value: value, add: add}}>
                    {props.render(IntValue)}
                </IntModifierContext.Provider>
            );
}

export const SimpleDisplay = function(props) {

    const c = useContext(IntModifierContext);

    return (
        <>
        <p className={c.value}>You have clicked here {props.value} times.</p>
        <input type="button" value="Click here" onClick={() => { c.add(1) }} />
        </>
    )
};

export const SimpleDisplay2 = function(props) {

    const c = useContext(IntModifierContext);

    return (
        <div className={c.value}>
            <div className="button-group">
                <input type="button" className={c.value} value={`Add 1 onto ${props.value}`} onClick={() => c.add(1)} />
                <input type="button" className={c.value} value={`Add 2 onto ${props.value}`} onClick={() => c.add(2)} />
                <input type="button" className={c.value} value={`Add 3 onto ${props.value}`} onClick={() => c.add(3)} />
                <input type="button" className={c.value} value={`Add 4 onto ${props.value}`} onClick={() => c.add(4)} />
                <input type="button" className={c.value} value={`Add 5 onto ${props.value}`} onClick={() => c.add(5)} />
            </div>
        </div>
    );

};


