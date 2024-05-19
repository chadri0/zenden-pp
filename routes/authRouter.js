const express = require("express");
const passport = require("passport");

const router = express.Router();

const { register, login, logout } = require("../controllers/authController");

router.post("/register", register);

//Refactored login post route
router.post("/login",
    passport.authenticate("local", {
        failureRedirect: "/login/error",
        failureMessage: true,
    }),
login);

router.get("/login/error", (request, response, next) => {
    response.json("Login error");
});

router.get("/logout", logout);

//export
module.exports = router;