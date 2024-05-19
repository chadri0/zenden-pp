const express = require("express");
const router = express.Router();
const {getSettings, saveSettings, resetSettings} = require("../controllers/adminController")

// get timer settings route
router.get("/settings", getSettings);

// save timer settings route
router.post("/settings/save", saveSettings);

// reset timer settings route
router.post("/settings/reset", resetSettings);

//export
module.exports = router;
