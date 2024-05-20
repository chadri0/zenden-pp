const express = require("express");
const router = express.Router();
const path = require("path");
const {startTimer, stopTimer, resetTimer, getState} = require("../controllers/timerController");

// default timer state route
router.get("/default", async (request, response, next) => {
    response.json(getState());
});
// router.get("/<route>", <variable name>); //doesn't work for this

// timer start route
router.post("/start", async (request, response, next) => {
    startTimer();
    response.json({ success: "Timer started"});
});
// timer pause route
router.delete("/pause", async (request, response, next) => {
    stopTimer();
    response.json({ success: "Timer stopped"});
});

// timer reset route
router.put("/reset", async (request, response, next) => {
    resetTimer();
    response.json({ success: "Timer reset"});
});

//export
module.exports = router;
