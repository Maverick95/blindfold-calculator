import { CalculatorState, useCalculator } from './useCalculator';
import { act, renderHook } from '@testing-library/react-hooks';

describe('useCalculator hook', () => {

    let testResult = null;
    let testWaitForNextUpdate = null;

    beforeAll(() => {
        const { result, waitForNextUpdate } = renderHook(() => useCalculator());
        testResult = result;
        testWaitForNextUpdate = waitForNextUpdate;
    });

    it.each([
        ['8', {     current: CalculatorState.INT_PRESSED_FIRST,     depth: 0,       output: '8',                    valid: true,       value: 8,       }],
        ['+', {     current: CalculatorState.OP_PRESSED,            depth: 0,       output: '8 +',                  valid: false,      value: 8,       }],
        ['3', {     current: CalculatorState.INT_PRESSED_OTHER,     depth: 0,       output: '',                     valid: true,       value: 11,       }],
        ['x', {     current: CalculatorState.OP_PRESSED,            depth: 0,       output: '',                     valid: false,       value: 11,       }],
        ['6', {     current: CalculatorState.INT_PRESSED_OTHER,     depth: 0,       output: '',                     valid: true,       value: 66,       }],
        ['+', {     current: CalculatorState.OP_PRESSED,            depth: 0,       output: '',                     valid: false,       value: 66,       }],
        ['(', {     current: CalculatorState.START_FIRST,           depth: 1,       output: '',                     valid: false,       value: 66,       }],
        ['1', {     current: CalculatorState.INT_PRESSED_FIRST,     depth: 1,       output: '',                     valid: false,       value: 66,       }],
        ['+', {     current: CalculatorState.OP_PRESSED,            depth: 1,       output: '',                     valid: false,       value:  66,       }],
        ['(', {     current: CalculatorState.START_FIRST,           depth: 2,       output: '',                     valid: false,       value: 66,       }],
        ['3', {     current: CalculatorState.INT_PRESSED_FIRST,     depth: 2,       output: '',                     valid: false,       value: 66,       }],
        ['x', {     current: CalculatorState.OP_PRESSED,            depth: 2,       output: '',                     valid: false,       value: 66,       }],
        ['6', {     current: CalculatorState.INT_PRESSED_OTHER,     depth: 2,       output: '',                     valid: false,       value: 66,       }],
        [')', {     current: CalculatorState.INT_PRESSED_FIRST,     depth: 1,       output: '',                     valid: false,       value: 66,       }],
        ['+', {     current: CalculatorState.OP_PRESSED,            depth: 1,       output: '',                     valid: false,       value: 66,       }],
        ['5', {     current: CalculatorState.INT_PRESSED_OTHER,     depth: 1,       output: '',                     valid: false,       value: 66,       }],
        [')', {     current: CalculatorState.END_FIRST,             depth: 0,       output: '',                     valid: true,       value: 90,       }]
    ])('Test here %#', (arg0, arg1) => {

        const parseArg0 = parseInt(arg0);
        const input = isNaN(parseArg0) ? arg0 : parseArg0;
        
        act(() => { testResult.current.onPress(input); });

        expect(testResult.current).toEqual(expect.objectContaining(arg1));

    });
        
});

