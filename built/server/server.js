var path = require("path");
var express = require("express");
var passport = require("passport");
var authRouter = require("./routes/auth.js");
var fairpayController = require("./controllers/fairpayControllers");
var cookieSession = require("cookie-session");
var cookieParser = require("cookie-parser");
var cors = require("cors");
require("./passport-setup");
var app = express();
var PORT = 3000;
app.use(express.json());
app.use(cookieParser());
app.use(cors());
/*
  Set up session cookies
  Executed during the passport serializer step (see passport-setup.js) to encrpyt browser cookie
*/
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["wonderpus"],
}));
// initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());
// route handlers
app.use("/auth", authRouter);
if (process.env.NODE_ENV === "production") {
    app.use("/build", express.static(path.resolve(__dirname, "../build")));
    app.get("/", function (req, res) {
        return res.status(200).sendFile(path.resolve(__dirname, "../index.html"));
    });
}
app.get("/api/test", fairpayController.getUser, function (req, res) {
    res.status(200).json(res.locals.userData);
});
// Returns all user data
app.get("/api/user", fairpayController.getUser, function (req, res) {
    res.status(200).json(res.locals.userData);
});
// Updates user with his/her personal, salary, and company information
// If company does not exists in company table, it gets added
app.post("/api/onboardUser", fairpayController.onboardUser, function (req, res) {
    //res.status(200).json(res.locals.userData);
    if (process.env.NODE_ENV === "production") {
        res.status(200).redirect("http://localhost:3000/home");
    }
    res.status(200).redirect("http://localhost:8080/home");
});
// Returns a list of all job titles of users in the platform associated with
// a particular company. Used for display a list for the user to select his/her
// job title.
app.post("/api/jobTitles", fairpayController.getCommonJobTitles, function (req, res) {
    res.status(200).json(res.locals.commonJobTitles);
});
app.use("/api/company/:linkedin_user_id", fairpayController.getCurrentUser, fairpayController.getCompanyData, fairpayController.getJobStats, fairpayController.getRaceStats, fairpayController.getAgeStats, fairpayController.getGenderStats, fairpayController.getJobStatsByCity, fairpayController.getRaceStatsByCity, fairpayController.getAgeStatsByCity, fairpayController.getGenderStatsByCity, function (req, res) {
    res.status(200).json({
        currentUser: res.locals.currentUser,
        companyData: res.locals.companyData.rows,
        jobStats: res.locals.jobStats,
        raceStats: res.locals.raceStats,
        ageStats: res.locals.ageStats,
        genderStats: res.locals.genderStats,
        jobStatsByCity: res.locals.jobStatsByCity,
        raceStatsByCity: res.locals.raceStatsByCity,
        ageStatsByCity: res.locals.ageStatsByCity,
        genderStatsByCity: res.locals.genderStatsByCity,
    });
});
// route error handler
app.use("*", function (req, res) { return res.sendStatus(404); });
// global middleware error handler
app.use(function (err, req, res, next) {
    var defaultErr = {
        log: "Express error handler caught unknown middleware error",
        status: 400,
        message: {
            err: "An error occurred",
        },
    };
    var errorObj = Object.assign({}, defaultErr);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});
app.listen(PORT, function () { return console.log("Server started on port ", PORT); });
module.exports = app;
//# sourceMappingURL=server.js.map