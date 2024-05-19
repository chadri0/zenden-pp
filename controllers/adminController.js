// TIMER SETTINGS HANDLERS
// function to handle saving timer settings
const saveSettings = async (request, response, next) => {
    try {
        const { minutes, breakTime, alertSound } = request.body;
        response.status(200).json({ 
            success: "Settings saved successfully"});
    } catch (error) {
        response.status(400).json({
            error: "Something happened while saving the settings..."
        });
    }
};

// function to handle resetting timer settings
const resetSettings = async (request, response, next) => {
    try {
        response.status(200).json({
            success: "Settings reset successfully"});
    } catch (error) {
        response.status(400).json({
            error: "Something happened while resetting the settings..."
        });
    }
};

// TO-DO-LIST HANDLER

// export
module.exports = { saveSettings, resetSettings };
