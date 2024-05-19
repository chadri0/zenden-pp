const bcrypt = require("bcrypt");

const User = require("../models/userModel");

const register = async (request, response, next) => {
    const { email, password } = request.body;
    bcrypt.hash(password, 10, async (error, hashedPassword) => {
    if (error) {
        return next(error);
    }
    const newUser = new User({
        email: email,
        password: hashedPassword, 
        googleID: "" //added
    });
    await newUser.save() 

    request.login(newUser, (err) => {
    response.status(201).json({
        success: { message: "New user is created" },
        data: { email },
        statusCode: 201,
    });
    })
    });
    response.status(500).json({
        error: { message: "Internal server error." },
        statusCode: 500,
    }); 

}

const login = async (request, response, next) => {
    console.log(request.user);
    response.status(200).json({
        success: { message: "User logged in." },
        data: {
            email: request.user.email,
        }, 
        statusCode: 200,
    });
}

const logout = async (request, response, next) => {
    response.json("You've reached the logout page. Logging off."); 
    request.logout((error) => {
        if (error) {
            response.json({
                error: { message: "Something went wrong when logging out" },
                statusCode: 400,
            });
         };
        response.json("Successfully logged out");
    });
};

module.exports = { register, login, logout };