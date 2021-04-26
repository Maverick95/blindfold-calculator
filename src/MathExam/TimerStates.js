const timerStates = {
    STATE_START: {id: 1, timeoutSecs: 10, description: 'start'},
    STATE_PLAY: {id: 2, timeoutSecs: 10, description: 'play'},
    STATE_PAUSE: {id: 3, timeoutSecs: 5, description: 'pause'},
    STATE_CORRECT: {id: 4, timeoutSecs: 3, description: 'correct'}
};

export default timerStates;