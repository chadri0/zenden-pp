const passport = require("passport"); 
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/userModel");

// implement local strategy
passport.use(
    new LocalStrategy(function verify(email, password, done) {
        User.findOne({email: email})
        .then((user) => {
            if (!user) {
                return done(null, false, {message: "User not found"});
            }
            bcrypt.compare(password, user.password, (error, result) => {
                console.log("result", result)
                if (error) {
                    return done (error);
                }
                return done (null, user);
            });
        })
        .catch((error) => {
            console.log(`There was an error finding the user from database: ${error}`);
        });
    })
);

// implement serializeUser/deserializeUser functions
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});