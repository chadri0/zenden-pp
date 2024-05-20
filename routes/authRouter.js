const express = require("express");
const passport = require("passport");

const {signupRequest, loginLocalFailed, logoutRequest} = require("../controllers/authController");

const router = express.Router();

// POST to the path of /login/local
router.post(
    "/login/local",
    passport.authenticate("local", {failureRedirect: "/login/local/failed"}),
    (request, response, next) => {
        response.status(200).json({
            success: {message: "User logged in."},
            data: {
                email: request.user.email,
                firstName: request.user.firstName,
                lastName: request.user.lastName,
            },
            statusCode: 200,
        });
    }
);

// GET to the path of /logout/local/failed
router.get("/login/local/failed", loginLocalFailed);

// GET to the path of /logout
router.get("/logout", logoutRequest);

// POST to the path of /signup with signupRequest handler function
router.post("/signup", signupRequest);

//export
module.exports = router;