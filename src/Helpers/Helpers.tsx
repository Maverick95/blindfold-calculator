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

export enum SectionContentType {
    PARAGRAPHS = "Paragraphs",
    BUTTONS = "Buttons",
};

const createSectionAriaLabel = (description: string, contentType: SectionContentType, enabled: boolean = true): string => {
    var result = `${description}, Contains ${contentType}`;
    if (!enabled) {
        switch (contentType) {
            case SectionContentType.BUTTONS:
                result += ', These Are Currently Disabled';
                break;
            case SectionContentType.PARAGRAPHS:
                result += ', There Is Currently No Content';
                break;
        }
    }
    return result;
}

interface IProps {
    value: string | number,
    codeLastPressed: string | number,
    enabled: boolean,
    onPress: (value: string) => void,
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
            if (enabled) { onPress(codeValue.toString()); }
        },
        'aria-label': ariaLabel,
    };

    return <input {...inputProps} />;

}

export {
    transformEquationToEnglish,
    createSectionAriaLabel,
    CalculatorInput
};