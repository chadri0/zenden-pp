function initializeTimer() {
    const timerDisplay = document.querySelector('.timer');
    const startPauseButton = document.getElementById('start-pause-button');
    const resetButton = document.getElementById('reset-button');

    // load settings and timer state from localStorage
    const settings = JSON.parse(localStorage.getItem('timerSettings')) || {
        minutes: 25,
        breakTime: 5,
        alertSound: 'soft-alarm'
    };

    const defaultState = {
        currentTime: settings.minutes * 60,
        isRunning: false,
        isWorkSession: true
    };
    let state = JSON.parse(localStorage.getItem('timerState')) || defaultState;

    const workTime = settings.minutes * 60;
    const breakTime = settings.breakTime * 60;
    let interval;

    // function to format time from seconds to MM:SS
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    // function to update timer display
    const updateTimerDisplay = () => {
        timerDisplay.textContent = formatTime(state.currentTime);
    };

    // function to save timer state to localStorage
    const saveState = () => {
        localStorage.setItem('timerState', JSON.stringify(state));
    };

    // function to handle timer countdown
    const tick = () => {
        if (state.currentTime > 0) {
            state.currentTime--;
            updateTimerDisplay();
            saveState();
        } else {
            clearInterval(interval);
            new Audio(`./public/sounds/${settings.alertSound}.mp3`).play();
            state.isRunning = false;
            state.isWorkSession = !state.isWorkSession;
            state.currentTime = state.isWorkSession ? workTime : breakTime;
            startPauseButton.innerHTML = '<i class="fa-solid fa-play"></i> start';
            updateTimerDisplay();
            saveState();
        }
    };

    // function to start the timer
    const startTimer = () => {
        interval = setInterval(tick, 1000);
    };

    // event listener for start/pause button
    startPauseButton.addEventListener('click', () => {
        if (state.isRunning) {
            clearInterval(interval);
            startPauseButton.innerHTML = '<i class="fa-solid fa-play"></i> start';
        } else {
            startTimer();
            startPauseButton.innerHTML = '<i class="fa-solid fa-pause"></i> pause';
        }
        state.isRunning = !state.isRunning;
        saveState();
    });

    // event listener for reset button
    resetButton.addEventListener('click', () => {
        clearInterval(interval);
        state = { ...defaultState, currentTime: workTime };
        updateTimerDisplay();
        startPauseButton.innerHTML = '<i class="fa-solid fa-play"></i> start';
        saveState();
    });

    // initialize display and button state
    updateTimerDisplay();
    startPauseButton.innerHTML = state.isRunning ? '<i class="fa-solid fa-pause"></i> pause' : '<i class="fa-solid fa-play"></i> start';

    // start the timer if it was running before the page was unloaded
    if (state.isRunning) {
        startTimer();
    }
}

// call the initializeTimer function 
document.addEventListener('DOMContentLoaded', initializeTimer);
