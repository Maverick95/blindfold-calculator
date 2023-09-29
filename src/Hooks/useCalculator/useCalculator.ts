import { useCallback, useMemo, useReducer } from 'react';
import { EquationStack } from 'equation-stack';

export enum CalculatorState {
    START_FIRST = "start_first",
    INT_PRESSED_FIRST = "int_pressed_first",
    END_FIRST = "end_first",
    OP_PRESSED = "op_pressed",
    INT_PRESSED_OTHER = "int_pressed_other",
};

export const CALCULATOR_ACTION_RESET: string = 'RESET';

interface IState {
    last: string | number,
    current: CalculatorState,
    depth: number,
};

interface IReturnProps {
    last: string | number,
    current: CalculatorState,
    depth: number,
    output: string,
    valid: boolean,
    value: number,
    onPress: (value: string) => void,
}

const EquationStateReducer = (state: IState, action: string | number): IState => {
    let { current, depth } = state;
    switch (action) {
        case CALCULATOR_ACTION_RESET:
            current = CalculatorState.START_FIRST;
            depth = 0;
            break;
        case '(':
            current = CalculatorState.START_FIRST;
            depth += 1;
            break;
        case ')':
            current = CalculatorState.END_FIRST;
            depth -= 1;
            break;
        case '+': case 'x':
            current = CalculatorState.OP_PRESSED;
            break;
        default:
            {
                switch (current) {
                    case CalculatorState.START_FIRST:
                        current = CalculatorState.INT_PRESSED_FIRST;
                        break;
                    case CalculatorState.OP_PRESSED:
                        current = CalculatorState.INT_PRESSED_OTHER;
                        break;
                    default:
                }
            }
    }
    return { last: action, current, depth };
}

const useCalculator = (): IReturnProps => {

    const equationStack: EquationStack = useMemo(() => new EquationStack(), []);

    const [equationState, setEquationState] = useReducer(
        EquationStateReducer,
        { 
            last: 'NONE',
            current: CalculatorState.START_FIRST,
            depth: 0,
        });

    const onPress = useCallback((value: string) => {
        if (value === CALCULATOR_ACTION_RESET) {
            equationStack.Reset();
        }
        else {
            equationStack.Add(value);
        }
        setEquationState(value);
    }, [equationStack]);

    return {
        ...equationState,
        output: equationStack.Output(),
        valid: equationStack.Valid(),
        value: equationStack.Value(),
        onPress,
    };
};

export { useCalculator };