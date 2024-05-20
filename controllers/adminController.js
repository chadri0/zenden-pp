// const { request } = require("express");
const TimerSettings = require("../models/timerSettingsModel");
const ToDo = require("../models/toDoModel");

// TIMER SETTINGS HANDLERS

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


// TO-DO-LIST HANDLERS
// create new task
const createToDo = async (request, response, next) => {
    const {task, completed} = request.body;

    const newToDo = new ToDo({
        task: task,
        completed: completed
    });

    try {
        await newToDo.save();
        response.status(201).json({success: "A new to-do item is created", data: newToDo})
    } catch (error) {
        response.status(400).json({error: "Something happened while creating a new to-do item", data: newToDo});
    }
};

// delete task
const deleteToDo = async (request, response, next) => {
    const {_id} = request.params;

    await ToDo.findByIdAndDelete({_id: _id});

    try {
        if (!deleteToDo) {
            return response.status(404).json({error: `To-Do item with ID ${id} not found`});
        }
        response.status(200).json({success: `To-Do item with ID ${id} deleted successfully`});
    } catch (error) {
        response.status(400).json({error: "Something happened while deleting a to-do item"});
    }
};


// export
module.exports = {saveSettings, resetSettings, createToDo, deleteToDo};
