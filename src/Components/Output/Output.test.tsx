import React from 'react';
import { findByRole, render } from '@testing-library/react';
import OutputComponent from './Output';

describe('Output component', () => {

    it('properly renders all information correctly by section', () => {

        const input = {
            output: '6 + 7 + (13 x 7) x 2',
            valid: true,
            value: 208,
            reset: () => {}
        };

        const { container } = render(<OutputComponent {...input} />);

        findByRole(container, 'region', {name: /read your input with maths symbols/i});




    });


});