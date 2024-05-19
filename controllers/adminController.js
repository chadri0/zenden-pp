// TIMER SETTINGS HANDLERS
const TimerSettings = require("../models/timerSettingsModel");

// function to get settings page
const getSettings = async (request, response, next) => {
    try {
        const settings = await TimerSettings.findOne({});
        if (settings) {
            response.status(200).json(settings);
        } else {
            response.status(404).json({
                error: "No settings found"
            });
        }
    } catch (error) {
        response.status(400).json({
            error: "Something happened while fetching the settings..."
        });
    }
};

// function to handle saving timer settings
const saveSettings = async (request, response, next) => {
    const { minutes, breakTime, alertSound } = request.body;

    const settings = await TimerSettings.findOneAndUpdate(
        {}, // empty filter to match the single settings document
        { minutes, breakTime, alertSound },
        { new: true, upsert: true } // upsert creates a new document if one doesn't exist
        );
    
    try {
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
    const defaultSettings = {
        minutes: 25,
        breakTime: 5,
        alertSound: 'soft-alarm'
    };
    
    const settings = await TimerSettings.findOneAndUpdate(
        {},
        defaultSettings,
        { new: true, upsert: true }
    );
    
    try {
        response.status(200).json({
            success: "Settings reset successfully"});
    } catch (error) {
        response.status(400).json({
            error: "Something happened while resetting the settings..."
        });
    }
};


// TO-DO-LIST HANDLERs

// export
module.exports = {getSettings,saveSettings, resetSettings};
