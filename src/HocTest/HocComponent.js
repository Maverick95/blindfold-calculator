import React, {useState} from 'react';

const HookFunction1 = function() {

    const [count, setCount] = useState({buttonCount: 0});

    return {
        state: count,
        onClick: function() {

            count.buttonCount++;
            setCount((state) => state);

            }
    };

};

const HookFunction2 = function() {

    const [count, setCount] = useState({buttonCount: 0});

    return {
        state: count,
        onClick: function() {
            
            setCount((state) => ({buttonCount: state.buttonCount + 1}));
        
        }
    };

}

const HocComponent = function(hookFunction) {

    return function(props) {
    
        const hook = hookFunction();

        const onClick = () => {

            hook.onClick();
            if ( props.onClick ) { props.onClick(); }
    
        }
        
        return (
        <div>
            <input type="button" onClick={onClick}
            value={'Clicked ' + hook.state.buttonCount + ' times'} />
            </div>
    );

};

};

const HocComponent1 = HocComponent(HookFunction1);
const HocComponent2 = HocComponent(HookFunction2);

export { HocComponent1, HocComponent2 };