const express = require("express");
const passport = require("passport");
const router = express.Router();


const {saveSettings, resetSettings, createToDo, deleteToDo} = require("../controllers/adminController")

const checkAuthentication = (request, response, next) => {
    if (request.isAuthenticated()) {
        return next();
    } else {
        response.redirect(403, "/unauthenticated");
    }
};

router.get("/admin", checkAuthentication, (request, response, next) => {
    try {
        router.get("/auth", (request, response, next) => {
            response.json("Authenticated");
        });
    // save timer settings route
    router.post("/settings/save", saveSettings);
    // reset timer settings route
    router.post("/settings/reset", resetSettings);
    // create new task item
    router.post("/todos/create", createToDo);
    // delete task item by ID
    router.delete("/todos/:_id/delete", deleteToDo);

    } catch (error) {
        console.log(error)
    }
});

// test route
// router.get("/admin/auth", (request, response, next) => {
//     response.json("authenticated");
// });

router.get("/unauthenticated", (request, response, next) => {
    response.redirect("/");
});


//export
module.exports = router;
 