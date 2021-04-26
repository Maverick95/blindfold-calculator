describe('Select a random number', () => {

    let number_clicked = null;

    beforeEach(() => {

        cy.visit('/CalculatorApp');

        number_clicked = Math.floor(Math.random() * 10);

        cy.get('.calc')
        .findByDisplayValue(number_clicked.toString())
        .click();

        });

    it('All numbers disabled', () => {

        for (let x = 0; x < 10; x++) {

            cy.get('.calc')
            .findByDisplayValue(x.toString()).then(b => {

                expect(b).to.be.disabled;

            });

        }

    });

    it('Operators enabled', () => {

        ['+', 'x'].forEach(x => {

            cy.get('.calc')
            .findByDisplayValue(x).then(b => {

                expect(b).to.be.enabled;

            });

        });

    });

    it('Brackets disabled', () => {

        ['(', ')'].forEach(x => {

            cy.get('.calc')
            .findByDisplayValue(x).then(b => {

                expect(b).to.be.disabled;

            });

        });

    });

    it('Output values match', () => {

        cy.get('.calc .calc-output').then(b => {

            expect(b.length).to.equal(2);
            expect(b[0].innerText).to.eql(number_clicked.toString());
            expect(b[1].innerText).to.eql(`Computed value : ${number_clicked}`);

        });

    });

});