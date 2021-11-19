import { transformEquationToEnglish } from './Helpers';

describe('transformEquationToEnglish', () => {

    it.each([
        [ '5 x 5 + 3', '5 Times 5 Plus 3' ],
        [ '7 + ( 2 + 3 )', '7 Plus Open Bracket 2 Plus 3 Close Bracket' ]
    ])('Produces correct output for "%s"', (input, expected) => {

        const actual = transformEquationToEnglish(input);
        expect(actual).toEqual(expected);

    });

});