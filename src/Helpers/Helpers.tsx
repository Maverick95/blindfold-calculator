import React from 'react';

const transformEquationToEnglish = (input: string): string => {

    const symbolsToWords = new Map([
        ['+', 'Plus'],
        ['x', 'Times'],
        ['(', 'Open Bracket'],
        [')', 'Close Bracket'],
    ]);

    return input.split(' ')
        .map(w => symbolsToWords.get(w) || w)
        .join(' ');

};

interface IProps {
    value: string | number,
    codeLastPressed: string | number,
    enabled: boolean,
    onPress: (value: string | number) => void,
    codeValue?: string | number,
    label?: string | number,
    className?: string,
}

const CalculatorInput: React.FC<IProps> = ({
    value,
    codeLastPressed,
    enabled,
    onPress,
    codeValue = value,
    label = value,
    className = ''
}) => {

    const lastPressed = codeValue === codeLastPressed;
    const ariaLabel = `${label}${lastPressed ? ', Just Pressed' : ''}${enabled ? '' : ', Disabled'}`;
    const inputProps = {
        type: 'button',
        value,
        className,
        onClick: () => {
            if (enabled) { onPress(codeValue); }
        },
        'aria-label': ariaLabel,
    };

    return <input {...inputProps} />;

}

export {
    transformEquationToEnglish,
    CalculatorInput
};