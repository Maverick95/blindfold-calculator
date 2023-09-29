import {useState} from 'react';

export const IntModifierHook = function() {

    const [hookState, setHookState] = useState( {IntValue: 0} );

    const theme = function(x) {

        if (x === 0) {

            return 'beginner';

        }
        else if (x >= 1 && x < 5) {

            return 'novice';

        }
        else if (x >= 5 && x < 10) {

            return 'intermediate';

        }
        else if (x >= 10 && x < 20) {

            return 'advanced';
        }
        else if (x >= 20) {

            return 'master';

        } 

        return 'default';

    }

    return {

        IntValue: hookState.IntValue,
        value: theme(hookState.IntValue),
        add: x => { setHookState(state => 
            ({IntValue: state.IntValue + x < 0 ? 0 : state.IntValue + x})); }
            
    };

}

