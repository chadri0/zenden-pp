const express = require("express");
const router = express.Router();
const path = require("path");
const {startTimer, stopTimer, resetTimer, getState} = require("../controllers/timerController");

// default timer state route
router.get("/timer", async (request, response, next) => {
    response.status(200).json(getState());
});
// router.get("/<route>", <variable name>); //doesn't work for this

// timer start route
router.post("/timer/start", async (request, response, next) => {
    startTimer();
    response.status(200).json({ success: "Timer started"});
});
// timer pause route
router.delete("/timer/pause", async (request, response, next) => {
    stopTimer();
    response.status(200).json({ success: "Timer stopped"});
});

// timer reset route
router.put("/timer/reset", async (request, response, next) => {
    resetTimer();
    response.status(200).json({ success: "Timer reset"});
});

//export
module.exports = router;
