const express = require("express");
const router = express.Router();
const {saveSettings, resetSettings, createToDo, deleteToDo} = require("../controllers/adminController")

// save timer settings route
router.post("/settings/save", saveSettings);

// reset timer settings route
router.post("/settings/reset", resetSettings);

// create new task item
router.post("/todos/create", createToDo);

// delete task item by ID
router.delete("/todos/:_id/delete", deleteToDo);


//export
module.exports = router;
