var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var db = require('../models/payfairModels');
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
var getCommonJobTitles = require('../helpers/getCommonJobTitles');
var upsertCompany = require('../helpers/upsertCompany');
var insertSalary = require('../helpers/insertSalary');
var fairpayController = {};
// GET /api/user: responds with all user data
fairpayController.getUser = function (req, res, next) {
    var currentUserId;
    if (!req.body.linkedin_user_id) {
        currentUserId = req.user.id;
    }
    else {
        currentUserId = req.body.linkedin_user_id;
    }
    var queryString = "SELECT *, c.linkedin_id AS company_linkedin_id, c.name AS company_name, c.city AS company_city, c.zipcode AS company_zipcode\n                    FROM public.users AS u\n                    LEFT OUTER JOIN public.company AS c\n                    ON u.company_id = c._id\n                    LEFT OUTER JOIN public.salary AS s\n                    ON u.salary = s._id\n                    WHERE u.linkedin_user_id = $1;";
    var params = [currentUserId];
    db.query(queryString, params, function (err, response) {
        if (err) {
            console.log('Error in query for user: ', err);
        }
        console.log('response in getUser', response.rows);
        res.locals.userData = response.rows;
        next();
    });
};
// POST /api/company/jobTitles
fairpayController.getCommonJobTitles = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = res.locals;
                return [4 /*yield*/, getCommonJobTitles.get(req)];
            case 1:
                _a.commonJobTitles = _b.sent();
                next();
                return [2 /*return*/];
        }
    });
}); };
// POST /api/user
fairpayController.onboardUser = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var userIdCookie, companyKey, salaryKey, _a, userId, sexuality, age, gender, race, city, state, params;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log('city in onboarduser controller', req.body.city);
                //if (!req.body.linkedin_user_id || !req.body.name || !req.body.company_name || !req.body.job_title || !req.body.company_linkedin_id) {
                console.log('COOKIES ', req.cookies);
                userIdCookie = jwt.verify(req.cookies.jsonToken, process.env.LINKEDIN_SECRET);
                if (!userIdCookie) {
                    res
                        .status(418)
                        .json("Invalid create user request: must include linkedin_user_id");
                }
                return [4 /*yield*/, upsertCompany.upsert(req, res)];
            case 1:
                companyKey = _b.sent();
                return [4 /*yield*/, insertSalary.insert(req, res, companyKey)];
            case 2:
                salaryKey = _b.sent();
                // then insert user into user table, including name, company foreign key and salary foreign key
                console.log('onboardUser req.body: ');
                console.log(req.body);
                _a = req.body, userId = _a.userId, sexuality = _a.sexuality, age = _a.age, gender = _a.gender, race = _a.race, city = _a.city, state = _a.state;
                queryString = "UPDATE users \n                SET company_id=$1, salary=$2, sexuality=$3,\n                    age=$4, gender=$5, race=$6,\n                    city=$7, state=$8\n                WHERE linkedin_user_id=$9\n                RETURNING *";
                params = [
                    companyKey,
                    salaryKey,
                    sexuality,
                    age,
                    gender,
                    race,
                    city,
                    state,
                    userIdCookie,
                ];
                db.query(queryString, params)
                    .then(function (response) {
                    res.locals.userData = response.rows[0];
                    next();
                })
                    .catch(function (err) {
                    return console.log('Error in query for creating new user entry:\n', err);
                });
                return [2 /*return*/];
        }
    });
}); };
// get /api/company/:linkedin_user_id retrieves current user data to be used in subsequent middleware that will retrieve company data
// FREDO: added 'u.city' column in SELECT to store city property in res.locals.currentUser
fairpayController.getCurrentUser = function (req, res, next) {
    console.log('get current user middleware');
    var linkedin_user_id = req.params.linkedin_user_id;
    var queryString = "select u.name, u.city, s.job_title, c.linkedin_id, u.sexuality, u.age, u.gender, u.race, s.employee_type, s.years_at_company, s.years_of_experience, s.base_salary, s.full_time_status, s.annual_bonus, s.stock_options, s.signing_bonus from salary s inner join company c on s.company_id = c._id inner join users u on s._id = u.salary where u.linkedin_user_id = '" + linkedin_user_id + "'";
    db.query(queryString, function (err, response) {
        console.log('get current user middleware, DB response:');
        console.log(response.rows[0]);
        if (err) {
            return next({
                log: "fairpayController.getCurrentUser: ERROR: " + err,
                message: {
                    err: 'fairpayController.getCurrentUser: ERROR: Check server logs for details',
                },
            });
        }
        res.locals.currentUser = response.rows[0];
        // console.log('res.locals.currentUser is', res.locals.currentUser);
        return next();
    });
};
// second middleware to fire after get to /api/company/:linkedin_user_id; sends company data of users with all same job titles at same company of user
fairpayController.getCompanyData = function (req, res, next) {
    var _a = res.locals.currentUser, job_title = _a.job_title, linkedin_id = _a.linkedin_id;
    // console.log(
    //   'inside getcompanydata, res.locals.currentUser is',
    //   res.locals.currentUser
    // );
    var params = [job_title, linkedin_id];
    //console.log("params is", params);
    var queryString = "select u.name, s.job_title, c.linkedin_id, u.sexuality, u.age, u.gender, u.race, s.employee_type, s.years_at_company, s.years_of_experience, s.base_salary, s.full_time_status, s.annual_bonus, s.stock_options, s.signing_bonus from salary s inner join company c on s.job_title = $1 and c.linkedin_id = $2 and s.company_id = c._id inner join users u on s._id = u.salary";
    db.query(queryString, params, function (err, response) {
        // console.log('inside get company, rows is ', response.rows);
        console.log('get company data middleware DB');
        if (err) {
            return next({
                log: "fairpayController.getCompanyData: ERROR: " + err,
                message: {
                    err: 'fairpayController.getCompanyData: ERROR: Check server logs for details',
                },
            });
        }
        res.locals.companyData = response;
        return next();
    });
};
// middleware gets avg stats of current user's job title in company
fairpayController.getJobStats = function (req, res, next) {
    var _a = res.locals.currentUser, linkedin_id = _a.linkedin_id, job_title = _a.job_title;
    var queryString = "SELECT s.job_title, \n              round(avg(s.base_salary), 0) as avg_salary, \n              round(avg(s.annual_bonus), 0) as avg_bonus, \n              round(avg(s.stock_options), 0) as avg_stock_options, \n              count(*) \n      FROM salary s \n      LEFT JOIN users u ON s._id = u.salary \n      LEFT JOIN company c ON c._id = s.company_id \n      WHERE c.linkedin_id = '" + linkedin_id + "' \n        AND s.active = 'true' \n        AND s.job_title = '" + job_title + "' \n      GROUP BY s.job_title ORDER BY s.job_title";
    db.query(queryString, function (err, response) {
        console.log('get job stats middleware DB query');
        console.log(response.rows);
        if (err) {
            return next({
                log: "fairpayController.getJobStats: ERROR: " + err,
                message: {
                    err: 'fairpayController.getJobStats: ERROR: Check server logs for details',
                },
            });
        }
        res.locals.jobStats = response.rows;
        //console.log('response.rows in getracestats', response.rows);
        return next();
    });
};
// middleware gets avg race stats of current user's company
fairpayController.getRaceStats = function (req, res, next) {
    var _a = res.locals.currentUser, linkedin_id = _a.linkedin_id, job_title = _a.job_title;
    var queryString = "select u.race, round(avg(s.base_salary), 0) as avg_salary, round(avg(s.annual_bonus), 0) as avg_bonus, round(avg(s.stock_options), 0) as avg_stock_options, count(*) from salary s left join users u on s._id = u.salary left join company c on c._id = s.company_id where c.linkedin_id = '" + linkedin_id + "' and s.active = 'true' and s.job_title = '" + job_title + "' group by u.race order by u.race";
    db.query(queryString, function (err, response) {
        console.log('get race stats middleware DB query');
        if (err) {
            return next({
                log: "fairpayController.getRaceStats: ERROR: " + err,
                message: {
                    err: 'fairpayController.getRaceStats: ERROR: Check server logs for details',
                },
            });
        }
        res.locals.raceStats = response.rows;
        //console.log('response.rows in getracestats', response.rows);
        return next();
    });
};
// middleware gets avg age stats of current user's company
fairpayController.getAgeStats = function (req, res, next) {
    var _a = res.locals.currentUser, linkedin_id = _a.linkedin_id, job_title = _a.job_title;
    var queryString = "select u.age, round(avg(s.base_salary), 0) as avg_salary, round(avg(s.annual_bonus), 0) as avg_bonus, round(avg(s.stock_options), 0) as avg_stock_options, count(*) from salary s left join users u on s._id = u.salary left join company c on c._id = s.company_id where c.linkedin_id = '" + linkedin_id + "' and s.active = 'true' and s.job_title = '" + job_title + "' group by u.age order by u.age";
    db.query(queryString, function (err, response) {
        console.log('get age stats middleware DB query');
        if (err) {
            return next({
                log: "fairpayController.getAgeStats: ERROR: " + err,
                message: {
                    err: 'fairpayController.getAgeStats: ERROR: Check server logs for details',
                },
            });
        }
        res.locals.ageStats = response.rows;
        //console.log('response.rows in getagestats', response.rows);
        return next();
    });
};
// middleware gets avg gender stats of current user's company
fairpayController.getGenderStats = function (req, res, next) {
    var _a = res.locals.currentUser, linkedin_id = _a.linkedin_id, job_title = _a.job_title;
    var queryString = "SELECT u.gender, \n            round(avg(s.base_salary), 0) as avg_salary, \n            round(avg(s.annual_bonus), 0) as avg_bonus, \n            round(avg(s.stock_options), 0) as avg_stock_options, \n            count(*) from salary s \n    LEFT JOIN users u on s._id = u.salary \n    LEFT JOIN company c on c._id = s.company_id \n    WHERE c.linkedin_id = '" + linkedin_id + "' \n      AND s.job_title = '" + job_title + "' \n      AND s.active = 'true'\n    GROUP BY u.gender ORDER BY u.gender";
    db.query(queryString, function (err, response) {
        console.log('get gender stats middleware DB query');
        if (err) {
            return next({
                log: "fairpayController.getGenderStats: ERROR: " + err,
                message: {
                    err: 'fairpayController.getGenderStats: ERROR: Check server logs for details',
                },
            });
        }
        res.locals.genderStats = response.rows;
        //console.log('response.rows in getgenderstats', response.rows);
        return next();
    });
};
//TO-DO:
// fairpayController.getGenderStatsByCity
fairpayController.getGenderStatsByCity = function (req, res, next) {
    var _a = res.locals.currentUser, job_title = _a.job_title, city = _a.city;
    var queryString = "SELECT u.gender,\n            round(avg(s.base_salary), 0) AS avg_salary, \n            round(avg(s.annual_bonus), 0) AS avg_bonus, \n            round(avg(s.stock_options), 0) AS avg_stock_options, \n            count(*) \n    FROM salary s \n    LEFT JOIN users u ON s._id = u.salary \n    WHERE s.job_title = '" + job_title + "' \n      AND s.active = 'true'\n      AND u.city = '" + city + "' \n    GROUP BY u.gender ORDER BY u.gender";
    db.query(queryString, function (err, response) {
        if (err) {
            return next({
                log: "fairpayController.getGenderStatsByCity: ERROR: " + err,
                message: {
                    err: 'fairpayController.getGenderStatsByCity: ERROR: Check server logs for details',
                },
            });
        }
        res.locals.genderStatsByCity = response.rows;
        //console.log('response.rows in getgenderstats', response.rows);
        return next();
    });
};
// fairpayController.getAgeStatsByCity
fairpayController.getAgeStatsByCity = function (req, res, next) {
    var _a = res.locals.currentUser, job_title = _a.job_title, city = _a.city;
    var queryString = "SELECT u.age,\n            round(avg(s.base_salary), 0) AS avg_salary, \n            round(avg(s.annual_bonus), 0) AS avg_bonus, \n            round(avg(s.stock_options), 0) AS avg_stock_options, \n            count(*) \n    FROM salary s \n    LEFT JOIN users u ON s._id = u.salary \n    WHERE s.job_title = '" + job_title + "' \n      AND s.active = 'true'\n      AND u.city = '" + city + "' \n    GROUP BY u.age ORDER BY u.age";
    db.query(queryString, function (err, response) {
        if (err) {
            return next({
                log: "fairpayController.getAgeStatsByCity: ERROR: " + err,
                message: {
                    err: 'fairpayController.getAgeStatsByCity: ERROR: Check server logs for details',
                },
            });
        }
        res.locals.ageStatsByCity = response.rows;
        //console.log('response.rows in getgenderstats', response.rows);
        return next();
    });
};
// fairpayController.getRaceStatsByCity
fairpayController.getRaceStatsByCity = function (req, res, next) {
    var _a = res.locals.currentUser, job_title = _a.job_title, city = _a.city;
    var queryString = "SELECT u.race,\n            round(avg(s.base_salary), 0) AS avg_salary, \n            round(avg(s.annual_bonus), 0) AS avg_bonus, \n            round(avg(s.stock_options), 0) AS avg_stock_options, \n            count(*) \n    FROM salary s \n    LEFT JOIN users u ON s._id = u.salary \n    WHERE s.job_title = '" + job_title + "' \n      AND s.active = 'true'\n      AND u.city = '" + city + "' \n    GROUP BY u.race ORDER BY u.race";
    db.query(queryString, function (err, response) {
        if (err) {
            return next({
                log: "fairpayController.getRaceStatsByCity: ERROR: " + err,
                message: {
                    err: 'fairpayController.getRaceStatsByCity: ERROR: Check server logs for details',
                },
            });
        }
        res.locals.raceStatsByCity = response.rows;
        //console.log('response.rows in getgenderstats', response.rows);
        return next();
    });
};
// fairpayController.getJobStatsByCity <-- aggregate data
fairpayController.getJobStatsByCity = function (req, res, next) {
    var _a = res.locals.currentUser, job_title = _a.job_title, city = _a.city;
    var queryString = "SELECT s.job_title, \n              round(avg(s.base_salary), 0) as avg_salary, \n              round(avg(s.annual_bonus), 0) as avg_bonus, \n              round(avg(s.stock_options), 0) as avg_stock_options, \n              count(*) \n      FROM salary s \n      LEFT JOIN users u ON s._id = u.salary \n      WHERE s.active = 'true' \n        AND s.job_title = '" + job_title + "'\n        AND u.city = '" + city + "' \n      GROUP BY s.job_title ORDER BY s.job_title";
    db.query(queryString, function (err, response) {
        if (err) {
            return next({
                log: "fairpayController.getJobStatsByCity: ERROR: " + err,
                message: {
                    err: 'fairpayController.getJobStatsByCity: ERROR: Check server logs for details',
                },
            });
        }
        res.locals.jobStatsByCity = response.rows;
        return next();
    });
};
module.exports = fairpayController;
//# sourceMappingURL=fairpayControllers.js.map