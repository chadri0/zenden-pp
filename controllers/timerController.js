const defaultState = {
    currentTime: 25 * 60, // default timer value in seconds (25 minutes)
    isRunning: false,
    isWorkSession: true
};

let state = { ...defaultState };

let interval;

const startTimer = () => {
    interval = setInterval(tick, 1000);
};

const stopTimer = () => {
    clearInterval(interval);
};

const resetTimer = () => {
    clearInterval(interval);
    state = { ...defaultState };
};

const tick = () => {
    if (state.currentTime > 0) {
        state.currentTime--;
    } else {
        clearInterval(interval);
        state.isRunning = false;
        state.isWorkSession = !state.isWorkSession;
        state.currentTime = state.isWorkSession ? 25 * 60 : 5 * 60;
    }
};

const getState = () => state;

module.exports = {startTimer, stopTimer, resetTimer, getState};
