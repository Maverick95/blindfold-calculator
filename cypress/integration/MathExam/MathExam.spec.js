import timerStates from '../../../src/MathExam/TimerStates.js';
import generateElementsDefault from '../../../src/MathExam/EquationGenerator.js';
import getDifficulty from '../../../src/MathExam/Difficulty.js';

// Timers run in second gaps, use a half-second difference to pick up real changes.

beforeEach(() => {

    cy.visit('/MathExam')

})

describe('MathExam starting screen', () => {

    it('Starting message only displays', () => {

        const difficulty_start = getDifficulty(0);
        const max_value = generateElementsDefault.maxValue;

        cy.contains('p', `Welcome to your Maths Exam! We'll be starting shortly in ${timerStates.STATE_START.timeoutSecs} seconds...`)
        .should('exist')

    })

})

describe('MathExam game playing screen', () => {

    it('Game begins after starting time ends', () => {

        cy.contains('p',
        /Currently playing\.\.\. ((10)|[0-9]{1}) seconds left!/,
        {timeout:1000 * timerStates.STATE_START.timeoutSecs + 500})
        .should('exist')

        // At the moment regex only caters for equation of two operands. TODO

        cy.contains('p', /[0-9]+ \+|x [0-9]+/)
        .should('exist')

        cy.get('input[type="text"]').should('exist')

    })

})

describe('Actions have correct outcomes', () => {

    beforeEach(() => {

        cy.wait(1000 * timerStates.STATE_START.timeoutSecs + 500)

    })

    it('Waiting is failure', () => {

        cy.wait(1000 * timerStates.STATE_PLAY.timeoutSecs)

        cy.contains('p', /Currently playing\.\.\. ((10)|[0-9]{1}) seconds left!/, {timeout: 0})
        .should('not.exist')

        cy.contains('p', /[0-9]+ \+|x [0-9]+/, {timeout: 0})
        .should('not.exist')

        cy.get('input[type="text"]').should('not.exist')

        cy.contains('p', 'Bad luck! You will get to try again in a second\.\.\.')
        .should('exist')

    })

    it('Passing through correct result gives correct screen', () => {


    })
})