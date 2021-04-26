import React, {useState, useEffect, useRef} from 'react';
import generateEquation from './Equation.js';
import generateElementsDefault from './EquationGenerator.js';
import timerStates from './TimerStates.js';
import getDifficulty from './Difficulty.js';

const MathExamStart = function(props) {

    return (
        <p>Welcome to your Maths Exam!
            We'll be starting shortly in {props.timeleft} seconds...</p>
    );

}

const MathExamFail = function(props) {

    return <p>Bad luck! You will get to try again in a second...</p>;
}

const MathExamTimer = function(props) {

    switch (props.status) {

        case 'play':
            return <p>Currently playing... {props.timeleft} seconds left!</p>;
        case 'correct':
            return <p>Well done! You got that one right. This will get harder though...</p>;
        default:
            return <p>Status not found.</p>;

    }

};

const MathExamTask = function(props) {

    return (
        <p>{`${props.equation}`}</p>
    );

}

const MathExamAnswer = React.forwardRef((props, ref) => {

    return (
        <>
        <input ref={ref} type="text" disabled={!props.open} onInput={props.update} />
        </>
    );

});

export default function MathExam() {

    const [timerState, setTimerState] = useState(
        {
            state: timerStates.STATE_START,
            streak: 0,
            equation: generateEquation(getDifficulty(0), generateElementsDefault)
        });
    
    const [clockState, setClockState] = useState(timerStates.STATE_START.timeoutSecs);
    
    const timerID = useRef(0); const clockID = useRef(0);
    
    const input = useRef(null);

    const checkAnswer = function(e) {

        if (e.target.value && 
            !((/[^ 0-9]/).test(e.target.value)) &&
            parseInt(e.target.value) === timerState.equation.result) {

                setTimerState(s => ({...s, state: timerStates.STATE_CORRECT }));

            }

    }
  
    useEffect(() => {

        // Set new timer for switching state.

        timerID.current = setTimeout(() => {

            setTimerState(s => {

                switch (s.state.id) {

                    case timerStates.STATE_START.id:

                        return { ...s, state: timerStates.STATE_PLAY };

                    case timerStates.STATE_PAUSE.id:

                        return { state: timerStates.STATE_PLAY, streak: 0,
                            equation: generateEquation(getDifficulty(0), generateElementsDefault) };

                    case timerStates.STATE_CORRECT.id:

                        return { state: timerStates.STATE_PLAY, streak: s.streak + 1,
                            equation: generateEquation(getDifficulty(s.streak + 1), generateElementsDefault) };

                    case timerStates.STATE_PLAY.id:

                        return { ...s, state: timerStates.STATE_PAUSE };
                    
                }

            });

        }, timerState.state.timeoutSecs * 1000);

        // Another state update "bubbled" up from resetting the main state.

        setClockState(s => {

            switch (timerState.state.id) {

                case timerStates.STATE_START.id:
                case timerStates.STATE_PLAY.id:

                    return timerState.state.timeoutSecs;

                default:

                    return s;
            }

        });

        if ([timerStates.STATE_START.id, timerStates.STATE_PLAY.id].includes(timerState.state.id)) {

                clockID.current = setInterval(() => {

                    setClockState(s => s-1 ? s-1 : 0);

                }, 1000);

        }
        
        if (timerState.state.id === timerStates.STATE_PLAY.id) {

            input.current.value = '';

        }

        // Call to update the input state.

        return () => {

            if (timerID.current) {
                clearTimeout(timerID.current);
                timerID.current = 0;
            }

            if (clockID.current) {
                clearInterval(clockID.current);
                clockID.current = 0;
            }

        };
    
    }, [timerState]);



    // Return component.



    switch (timerState.state.id) {

        case timerStates.STATE_START.id:

            return (
                <>
                <MathExamStart timeleft={clockState} />
                </>
            );

        case timerStates.STATE_PAUSE.id:

            return (
                <>
                <MathExamFail />
                </>
            );

        default:

            return (
                <>
                <MathExamTimer status={timerState.state.description} timeleft={clockState} />
                <MathExamTask equation={timerState.equation.description} result={timerState.equation.result} />
                <MathExamAnswer ref={input} open={timerState.state.id === timerStates.STATE_PLAY.id} update={checkAnswer} />
                </>
            );
        
        }

};
