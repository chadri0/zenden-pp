const mongoose = require("mongoose");

const timerSettingsSchema = new mongoose.Schema({
    minutes: {
        type: Number,
        default: 25
    },
    breakTime: {
        type: Number,
        default: 5
    },
    alertSound: {
        type: String,
        default: "soft-alarm"
    }
});

const TimerSettings = mongoose.model("TimerSettings", timerSettingsSchema);

module.exports = TimerSettings;