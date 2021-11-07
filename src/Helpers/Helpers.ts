const transformEquationToEnglish = (input: string): string => {

    const symbolsToWords = new Map([
            ['+', 'Plus'],
            ['x', 'Multiplied By'],
            ['(', 'Open Bracket'],
            [')', 'Close Bracket'],
        ]);

    return input.split(' ')
        .map(w => symbolsToWords.get(w) || w)
        .join(' ');
        
};

export { transformEquationToEnglish };