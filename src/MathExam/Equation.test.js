import Equation from './Equation.js';

const mockData =
[
    [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        ['+', '+', '+', '+', '+', '+', '+', '+', '+'],
        '1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10',
        55
    ],
    [
        [2, 5, 6],
        ['x', '+'],
        '2 x 5 + 6',
        16
    ],
    [
        [5, 5, 5, 5],
        ['x', 'x', 'x'],
        '5 x 5 x 5 x 5',
        625
    ],
    [
        [10, 10, 10, 10, 10],
        ['+', 'x', '+', 'x'],
        '10 + 10 x 10 + 10 x 10',
        2100
    ],
    [
        [2, 9, 7, 5, 3],
        ['+', 'x', 'x', 'x'],
        '2 + 9 x 7 x 5 x 3',
        1155
    ]
];


describe('Tests using mock data', () => {

    let mockEquationGenerator = null;

    beforeAll(() => {

        jest.mock('./EquationGenerator.js');
        mockEquationGenerator = require('./EquationGenerator.js');

    });

    describe.each(mockData)('Example case number %#', (num, sym, des, res) => {

        beforeEach(() => {

            num.forEach((v, i) => {
                mockEquationGenerator.generateNumber.mockReturnValueOnce(v);
                // Last will be undefined but shouldn't matter for implementation.
                mockEquationGenerator.generateSymbol.mockReturnValueOnce(sym[i]);
            });

        });

        test('Descriptions match', () => {

            expect(Equation(num.length, mockEquationGenerator).description).toEqual(des);

        });

        test('Values match', () => {

            expect(Equation(num.length, mockEquationGenerator).result).toEqual(res);

        });

        afterEach(() => {

            mockEquationGenerator.generateNumber.mockReset();
            mockEquationGenerator.generateSymbol.mockReset();

        });

    });

    afterAll(() => {

        jest.unmock('./EquationGenerator.js');

    });

});