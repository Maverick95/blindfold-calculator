describe('Calculator component', () => {

    beforeEach(() => {
        cy.visit('/');
    });

    it('loads Calculator with correct configuration', () => {

        // Number
        cy.findByRole('button', {name: /^0$/i});

        // Operator
        cy.findByRole('button', {name: /^plus, disabled$/i});

        // Brackets
        cy.findByRole('button', {name: /^\($/i});
        cy.findByRole('button', {name: /^\), disabled$/i});

        // Output
        cy.findByRole('region', {name: /symbols/i}).findByText(/^no input received$/i);
        cy.findByRole('region', {name: /english/i}).findByText(/^no input received$/i);
        cy.findByRole('region', {name: /result/i}).findByText(/^no valid value$/i);
        
    });

    it('responds correctly to 1 user input (Number)', () => {

        cy.findByRole('button', {name: /^5$/i}).click();

        // Number
        cy.findByRole('button', {name: /^5$/i}).should('not.exist');
        cy.findByRole('button', {name: /^5, disabled$/i});

        // Operator
        cy.findByRole('button', {name: /^plus, disabled$/i}).should('not.exist');
        cy.findByRole('button', {name: /^plus$/i});

        // Brackets
        cy.findByRole('button', {name: /^\($/i}).should('not.exist');
        cy.findByRole('button', {name: /^\(, disabled$/i});
        cy.findByRole('button', {name: /^\), disabled$/i});

        // Output
        cy.findByRole('region', {name: /symbols/i}).findByText(/^5$/i);
        cy.findByRole('region', {name: /english/i}).findByText(/^5$/i);
        cy.findByRole('region', {name: /result/i}).findByText(/^5$/i);

    });

    it('responds correctly to 2 user inputs (Number, Operator)', () => {

        cy.findByRole('button', {name: /^5$/i}).click();        
        cy.findByRole('button', {name: /^plus$/i}).click();

        // Number
        cy.findByRole('button', {name: /^5, disabled$/i}).should('not.exist');
        cy.findByRole('button', {name: /^5$/i});

        // Operator
        cy.findByRole('button', {name: /^plus$/i}).should('not.exist');
        cy.findByRole('button', {name: /^plus, disabled$/i});

        // Brackets
        cy.findByRole('button', {name: /^\(, disabled$/i}).should('not.exist');
        cy.findByRole('button', {name: /^\($/i});
        cy.findByRole('button', {name: /^\), disabled$/i});

        // Output
        cy.findByRole('region', {name: /symbols/i}).findByText(/^5 \+$/i);
        cy.findByRole('region', {name: /english/i}).findByText(/^5 plus$/i);
        cy.findByRole('region', {name: /result/i}).findByText(/^no valid value$/i);

    });

    it('responds correctly to 3 user inputs (Number, Operator, Number)', () => {

        cy.findByRole('button', {name: /^5$/i}).click();        
        cy.findByRole('button', {name: /^plus$/i}).click();
        cy.findByRole('button', {name: /^5$/i}).click();
        
        // Number
        cy.findByRole('button', {name: /^5, disabled$/i});
        cy.findByRole('button', {name: /^5$/i}).should('not.exist');

        // Operator
        cy.findByRole('button', {name: /^plus$/i});
        cy.findByRole('button', {name: /^plus, disabled$/i}).should('not.exist');

        // Brackets
        cy.findByRole('button', {name: /^\($/i}).should('not.exist');
        cy.findByRole('button', {name: /^\(, disabled$/i});
        cy.findByRole('button', {name: /^\), disabled$/i});

        // Output
        cy.findByRole('region', {name: /symbols/i}).findByText(/^5 \+ 5$/i);
        cy.findByRole('region', {name: /english/i}).findByText(/^5 plus 5$/i);
        cy.findByRole('region', {name: /result/i}).findByText(/^10$/i);

    });

    it('correctly computes and displays output for a more complicated equation, and resets correctly', () => {

        /*
        5 + 5 x ( 3 x ( 4 + 8 ) ) + 9 = 369
        */

        cy.findByRole('button', {name: /^5$/i}).click();
        cy.findByRole('button', {name: /^plus$/i}).click();
        cy.findByRole('button', {name: /^5$/i}).click();
        cy.findByRole('button', {name: /^times$/i}).click();
        cy.findByRole('button', {name: /^\($/i}).click();
        cy.findByRole('button', {name: /^3$/i}).click();
        cy.findByRole('button', {name: /^times$/i}).click();
        cy.findByRole('button', {name: /^\($/i}).click();
        cy.findByRole('button', {name: /^4$/i}).click();
        cy.findByRole('button', {name: /^plus$/i}).click();
        cy.findByRole('button', {name: /^8$/i}).click();
        cy.findByRole('button', {name: /^\)$/i}).click();
        cy.findByRole('button', {name: /^\)$/i}).click();
        cy.findByRole('button', {name: /^plus$/i}).click();
        cy.findByRole('button', {name: /^9$/i}).click();

        // Output
        cy.findByRole('region', {name: /symbols/i}).findByText(/^5 \+ 5 \x \( 3 \x \( 4 \+ 8 \) \) \+ 9$/i);
        cy.findByRole('region', {name: /english/i}).findByText(/^5 plus 5 times open bracket 3 times open bracket 4 plus 8 close bracket close bracket plus 9$/i);
        cy.findByRole('region', {name: /result/i}).findByText(/^369$/i);

        cy.findByRole('button', {name: /reset/i}).click();

        // Output
        cy.findByRole('region', {name: /symbols/i}).findByText(/no input received$/i);
        cy.findByRole('region', {name: /english/i}).findByText(/^no input received$/i);
        cy.findByRole('region', {name: /result/i}).findByText(/^no valid value$/i);

    });

});