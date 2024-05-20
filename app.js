// dependencies/packages
require("dotenv").config(); 
require("./config/authStrategy"); 
require("./config/connection"); 
const express = require("express");
const morgan = require("morgan");
const path = require("node:path");
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require("cors"); 
const helmet = require("helmet"); 
const session = require("express-session"); 
const passport = require("passport");

app.use(morgan("dev"));

// routing variables
const adminRoutes = require("./routes/adminRouter");
const authRoutes = require("./routes/authRouter");
const timerRoutes = require("./routes/timerRouter");

// middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname + "/public")));

// utilize session
app.use(
    session({
      secret: process.env.SECRET_KEY,
      resave: false,
      saveUninitialized: false,
    })
  );

  // initialize passport and session
app.use(passport.initialize()); 
app.use(passport.session());


// index to initialize server
app.get("/", (request, response, next) => {
    response.status(200).json({success: {message: "Index successful! This route points to the homepage!"}, statusCode: 200});
});

// use routers
app.use(adminRoutes); 
app.use("/", authRoutes);
app.use("/timer", timerRoutes);

// server
app.listen(PORT, () => {
    console.log(`Cozy Pomodoro Timer server is listening on port ${PORT}`);
    console.log(`http://localhost:${PORT}/`)
});
