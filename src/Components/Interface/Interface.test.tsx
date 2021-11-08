import React from 'react';
import { render, fireEvent, findByRole } from '@testing-library/react';
import InterfaceComponent from './Interface';

const mockedOnPress = jest.fn((value: string | number) => {});

describe('Interface component', () => {

    beforeEach(() => {
        mockedOnPress.mockClear();
    });

    it('should execute click actions when enabled', async () => {

        // ARRANGE

        const props = {
            enableNumbers: true,
            enableOperators: true,
            enableOpenBracket: true,
            enableCloseBracket: true,
            onPress: mockedOnPress
        };

        // ACT

        const { container } = render(<InterfaceComponent {...props} />);
        
        const btnNumber = await findByRole(container, 'button', {name: '0'});
        fireEvent.click(btnNumber);
        const btnOperator = await findByRole(container, 'button', {name: /plus/i});
        fireEvent.click(btnOperator);
        const btnOpenBracket = await findByRole(container, 'button', {name: '('});
        fireEvent.click(btnOpenBracket);
        const btnCloseBracket = await findByRole(container, 'button', {name: ')'});
        fireEvent.click(btnCloseBracket);

        // ASSERT

        expect(mockedOnPress).toHaveBeenCalledTimes(4);
        
    });

    it('should not execute click actions when disabled', async () => {

        // ARRANGE

        const props = {
            enableNumbers: false,
            enableOperators: false,
            enableOpenBracket: false,
            enableCloseBracket: false,
            onPress: mockedOnPress
        };

        // ACT

        const { container } = render(<InterfaceComponent {...props} />);
        
        const btnNumber = await findByRole(container, 'button', {name: /0, disabled/i});
        fireEvent.click(btnNumber);
        const btnOperator = await findByRole(container, 'button', {name: /plus, disabled/i});
        fireEvent.click(btnOperator);
        const btnOpenBracket = await findByRole(container, 'button', {name: /\(, disabled/i});
        fireEvent.click(btnOpenBracket);
        const btnCloseBracket = await findByRole(container, 'button', {name: /\), disabled/i});
        fireEvent.click(btnCloseBracket);

        // ASSERT

        expect(mockedOnPress).not.toHaveBeenCalled();

    });

});