import * as Data from '../../../src/LanguageSelector/LanguageSelector_Data.js';

describe('LanguageSelector tests', () => {

    beforeEach(() => {

        cy.visit('/LanguageSelector');

    });

    it.skip('Table and button exists', () => {

        cy.get(`table[data-testid=${Data.TestTableSelector}]`);
        cy.get('input[type="button"]');

    });

    it.skip('Table has rows with expected values', () => {

        Data.TestLanguages.forEach(m => {

            cy.get(`table[data-testid=${Data.TestTableSelector}]`)
            .find(`input#${Data.TestLanguageLabel(m)}`)
            .should('be.not.checked');

        });

    });

    it('Interacting with the form has the desired outcome', () => {

        // Use the Data import to calculate how long you should have to wait.

        let total = 0; let { current, max, factor } = Data.TestDelay;

        while (current < max) {
            total += current; current *= factor;
        }

        total = Math.ceil(total/1000) * 1000;

        Data.TestLanguages
        .filter(() => Math.random() < 0.5)
        .forEach(m => {

            cy.get(`table[data-testid=${Data.TestTableSelector}]`)
            .find(`input#${Data.TestLanguageLabel(m)}`)
            .click();

        });

        cy.get('input[type="button"]').click();

        cy.get('p.final', { timeout:1000 + total}).should('exist');

        cy.get(`table[data-testid=${Data.TestTableSelector}] td.final`)
        .should('have.lengthOf', 1);

    });

});