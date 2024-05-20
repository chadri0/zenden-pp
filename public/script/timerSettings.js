function initializeTimerSettings() {
    const minutesInput = document.getElementById('minutes');
    const breakInput = document.getElementById('break');
    const alertSoundSelect = document.getElementById('alert-sound');
    const resetButton = document.querySelector('.resetsettings-button');
    const saveButton = document.querySelector('.savesettings-button');
    
    // function to validate input values
    const validateInput = (input) => {
        let value = parseInt(input.value, 10);
        if (isNaN(value) || value < 5) {
            input.value = 5;
        } else if (value > 60) {
            input.value = 60;
        } else {
            input.value = Math.round(value / 5) * 5;
        }
    };

    // function to handle reset button click
    const handleReset = () => {
        minutesInput.value = 25;
        breakInput.value = 5;
        alertSoundSelect.selectedIndex = 0;
    };

    // function to handle save button click
    const handleSave = () => {
        const settings = {
            minutes: minutesInput.value,
            breakTime: breakInput.value,
            alertSound: alertSoundSelect.value
        };

        localStorage.setItem('timerSettings', JSON.stringify(settings));
        alert('Settings saved!');
    };

    // event listener for alert sound select change
    alertSoundSelect.addEventListener('change', () => {
        const selectedSound = alertSoundSelect.value;
        const audio = new Audio(`./public/sounds/${selectedSound}.mp3`);
        audio.play();
    });

    // event listeners for input validation and buttons
    minutesInput.addEventListener('change', () => validateInput(minutesInput));
    breakInput.addEventListener('change', () => validateInput(breakInput));
    resetButton.addEventListener('click', handleReset);
    saveButton.addEventListener('click', handleSave);
}

// call the function
document.addEventListener('DOMContentLoaded', initializeTimerSettings);
