import { CALCULATOR_ACTION_RESET, CalculatorState, useCalculator } from './useCalculator';
import { act, renderHook } from '@testing-library/react-hooks';

const testInputData = [
    ['8', {     current: CalculatorState.INT_PRESSED_FIRST,     depth: 0,       output: '8',                                    valid: true,        value: 8,           }],
    ['+', {     current: CalculatorState.OP_PRESSED,            depth: 0,       output: '8 +',                                  valid: false,       value: 8,           }],
    ['3', {     current: CalculatorState.INT_PRESSED_OTHER,     depth: 0,       output: '8 + 3',                                valid: true,        value: 11,          }],
    ['x', {     current: CalculatorState.OP_PRESSED,            depth: 0,       output: '8 + 3 x',                              valid: false,       value: 11,          }],
    ['6', {     current: CalculatorState.INT_PRESSED_OTHER,     depth: 0,       output: '8 + 3 x 6',                            valid: true,        value: 66,          }],
    ['+', {     current: CalculatorState.OP_PRESSED,            depth: 0,       output: '8 + 3 x 6 +',                          valid: false,       value: 66,          }],
    ['(', {     current: CalculatorState.START_FIRST,           depth: 1,       output: '8 + 3 x 6 + (',                        valid: false,       value: 66,          }],
    ['1', {     current: CalculatorState.INT_PRESSED_FIRST,     depth: 1,       output: '8 + 3 x 6 + ( 1',                      valid: false,       value: 66,          }],
    ['+', {     current: CalculatorState.OP_PRESSED,            depth: 1,       output: '8 + 3 x 6 + ( 1 +',                    valid: false,       value: 66,          }],
    ['(', {     current: CalculatorState.START_FIRST,           depth: 2,       output: '8 + 3 x 6 + ( 1 + (',                  valid: false,       value: 66,          }],
    ['3', {     current: CalculatorState.INT_PRESSED_FIRST,     depth: 2,       output: '8 + 3 x 6 + ( 1 + ( 3',                valid: false,       value: 66,          }],
    ['x', {     current: CalculatorState.OP_PRESSED,            depth: 2,       output: '8 + 3 x 6 + ( 1 + ( 3 x',              valid: false,       value: 66,          }],
    ['6', {     current: CalculatorState.INT_PRESSED_OTHER,     depth: 2,       output: '8 + 3 x 6 + ( 1 + ( 3 x 6',            valid: false,       value: 66,          }],
    [')', {     current: CalculatorState.END_FIRST,             depth: 1,       output: '8 + 3 x 6 + ( 1 + ( 3 x 6 )',          valid: false,       value: 66,          }],
    ['+', {     current: CalculatorState.OP_PRESSED,            depth: 1,       output: '8 + 3 x 6 + ( 1 + ( 3 x 6 ) +',        valid: false,       value: 66,          }],
    ['5', {     current: CalculatorState.INT_PRESSED_OTHER,     depth: 1,       output: '8 + 3 x 6 + ( 1 + ( 3 x 6 ) + 5',      valid: false,       value: 66,          }],
    [')', {     current: CalculatorState.END_FIRST,             depth: 0,       output: '8 + 3 x 6 + ( 1 + ( 3 x 6 ) + 5 )',    valid: true,        value: 90,          }]
];

describe('useCalculator hook', () => {
    
    it('produces correct output for each step of the test equation', () => {
        
        const { result } = renderHook(() => useCalculator());

        expect(result.current).toEqual(expect.objectContaining({
            current: CalculatorState.START_FIRST,
            depth: 0,
            output: '',
            valid: false,
            value: 0,
        }));

        const enterInputAndVerify = (input, expected) => {
            const parseInput = parseInt(input);
            const useInput = isNaN(parseInput) ? input : parseInput;
            act(() => { result.current.onPress(useInput); });
            expect(result.current).toEqual(expect.objectContaining(expected));
        };

        for (const i of testInputData) {
            enterInputAndVerify(i[0], i[1]);
        }

        act(() => { result.current.onPress(CALCULATOR_ACTION_RESET); });

        expect(result.current).toEqual(expect.objectContaining({
            current: CalculatorState.START_FIRST,
            depth: 0,
            output: '',
            valid: false,
            value: 0,
        }));

    });
        
});

