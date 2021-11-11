import React from 'react';
import {render} from '@testing-library/react';
import Calculator from './Calculator';

describe('Calculator component', () => {

    it('should render', () => {
        const { container } = render(<Calculator />);
    });

});