import React from 'react';
import * as TestReact from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {TestTableSelector, TestButtonText, TestLanguageLabel, TestLanguages, TestDelay} from './LanguageSelector_Data.js';
import LanguageSelector from './LanguageSelector.js';
import { waitFor } from '@testing-library/react';

let container = null;

const languages_test = ['C++', 'Java'];

beforeEach(() => {

    container = TestReact.render(<LanguageSelector />).container;

});

afterEach(TestReact.cleanup);

test('Table exists', () => {

    expect(() => TestReact.getByTestId(container, TestTableSelector)).not.toThrow();

});

test('Button exists', () => {

    expect(() => TestReact.getByDisplayValue(container, TestButtonText)).not.toThrow();

});

test('Language selector table contains appropriate values', () => {

    let container_table = TestReact.getByTestId(container, TestTableSelector);

    TestLanguages.forEach(m => {

        expect(() => TestReact.getByText(container_table, m)).not.toThrow();

    });

});

test('Selecting languages triggers appropriate sub-selection', (done) => {

    // Run through the selection process, firing events.

    let container_table = TestReact.getByTestId(container, TestTableSelector);
    let button_random = TestReact.getByDisplayValue(container, TestButtonText);

    languages_test.forEach(m => {

        let label_checkbox = TestReact.getByLabelText(container_table, m);
        userEvent.click(label_checkbox);

    });

    userEvent.click(button_random);

    // Command below says "wait for the DOM to progress to second phase"

    waitFor(() => expect(() => TestReact.getByDisplayValue(container, TestButtonText)).toThrow())
    .then((k) => {

        languages_test.forEach(m => {

            expect(() => TestReact.getByText(container_table, m)).not.toThrow();

        });

        TestLanguages.filter(m => !languages_test.some(n => n === m))
        .forEach(m => {

            expect(() => TestReact.getByText(container_table, m)).toThrow();

        });

        done();

    });

});