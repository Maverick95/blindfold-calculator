import React from 'react';
import { findByRole, findByText, render } from '@testing-library/react';
import OutputComponent from './Output';

describe('Output component', () => {

    it('correctly displays valid result', async () => {

        // ARRANGE

        const props = {
            output: '6 + 7 + ( 7 x 7 ) x 2',
            valid: true,
            value: 208,
            lastPressed: 'NONE',
            onPress: (value: string | number) => {}
        };

        // ACT

        const { container } = render(<OutputComponent {...props} />);

        // ASSERT

        const sectionSymbols = await findByRole(container, 'region', {name: /symbols/i});
        await findByText(sectionSymbols, props.output);

        const sectionEnglish = await findByRole(container, 'region', {name: /english/i});
        await findByText(sectionEnglish, /6 plus 7 plus open bracket 7 times 7 close bracket times 2/i);

        const sectionResults = await findByRole(container, 'region', {name: /results/i});
        await findByText(sectionResults, props.value);

        const btnReset = await findByRole(container, 'button', {name: /reset/i});
        expect(btnReset).not.toHaveAttribute('disabled');

    });

    it('correctly displays empty result', async() => {

        // ARRANGE

        const props = {
            output: null,
            valid: false,
            value: null,
            lastPressed: 'NONE',
            onPress: (value: string | number) => {}
        };

        // ACT

        const { container } = render(<OutputComponent {...props} />);

        // ASSERT

        const sectionSymbols = await findByRole(container, 'region', {name: /symbols/i});
        await findByText(sectionSymbols, /no input received/i);

        const sectionEnglish = await findByRole(container, 'region', {name: /english/i});
        await findByText(sectionEnglish, /no input received/i);

        const sectionResults = await findByRole(container, 'region', {name: /results/i});
        await findByText(sectionResults, /no valid value/i);

    });


});