const express = require("express");
const router = express.Router();
const { saveSettings, resetSettings } = require("../controllers/adminController")

// save timer settings route
router.post("/settings/save", saveSettings);

// reset timer settings route
router.post("/settings/reset", resetSettings);

//export
module.exports = router;
