"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var TitleCount_jsx_1 = __importDefault(require("./TitleCount.jsx"));
var core_1 = require("@material-ui/core");
function GetStarted(props) {
    var history = react_router_dom_1.useHistory();
    // the "step" control defines which part of the three step flow the user is on
    var _a = react_1.useState("intro"), step = _a[0], setStep = _a[1];
    // initialize inputs as an empty object
    // every time we udpate inputs, we'll use the setInput functio
    var _b = react_1.useState({}), inputs = _b[0], setInputs = _b[1];
    var _c = react_1.useState({}), errors = _c[0], setErrors = _c[1];
    var _d = react_1.useState(null), titleCount = _d[0], setTitleCount = _d[1];
    var _e = react_1.useState(false), currentStepComplete = _e[0], updateStepCompletionStatus = _e[1];
    var steps = ["intro", "company", "title", "income", "personal", "complete"];
    // function is called each time user clicks  'next'
    function moveToNextStep() {
        if (step === "company") {
            console.log(inputs.company);
            console.log("city", inputs.city);
            getRoleCount(inputs.company);
        }
        setStep(steps[steps.indexOf(step) + 1]);
    }
    // returns array of counts for each title at a given company
    function getRoleCount(company) {
        return __awaiter(this, void 0, void 0, function () {
            var data, result, data_1, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = { company_name: company };
                        return [4 /*yield*/, fetch("/api/jobTitles", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(data),
                            })];
                    case 1:
                        result = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, result.json()];
                    case 3:
                        data_1 = _a.sent();
                        setTitleCount(data_1);
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        return [2 /*return*/, err_1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    // called each time an input changes
    // updates state, checks for validation errors, and updates disable status of button
    function handleChange(event) {
        var _a = event.target, name = _a.name, value = _a.value;
        setInputs(function (prevState) {
            var _a;
            return (__assign(__assign({}, prevState), (_a = {}, _a[name] = value, _a)));
        });
        handleError(name, value);
        determineIfStepComplete();
    }
    function handleError(name, value) {
        // for every change in the input, we're going to check whether that passes our validation requirements
        var error;
        var numberFields = [
            "annualIncome",
            "annualBonus",
            "stockOptions",
            "hourlyWage",
            "yearsExperience",
            "yearsTenure",
        ];
        if (numberFields.includes(name)) {
            if (isNaN(Number(value))) {
                error = "Please enter a number";
            }
        }
        if (error !== undefined) {
            setErrors(function (prevState) {
                var _a;
                return (__assign(__assign({}, prevState), (_a = {}, _a[name] = error, _a)));
            });
        }
        // if there is an error in the error object but the input has passed all tests, remove the error from error object
        else if (errors.hasOwnProperty(name)) {
            delete errors[name];
        }
    }
    // this function determines whether the next button is disabled
    function determineIfStepComplete() {
        var hasError = false;
        var isIncomplete = false;
        var reqQuestions;
        // determine required questions for a given step
        if (step === "income" &&
            (!inputs.employeeType || inputs.employeeType === "Salary")) {
            reqQuestions = [
                "employeeType",
                "annualIncome",
                "annualBonus",
                "stockOptions",
            ];
        }
        else if (step === "income" &&
            (!inputs.employeeType || inputs.employeeType === "Hourly")) {
            reqQuestions = ["employeeType", "hourlyWage", "ftStatus"];
        }
        else if (step === "title") {
            reqQuestions = ["yearsExperience", "yearsTenure", "title"];
        }
        else if (step === "company") {
            reqQuestions = ["company", "state"];
        }
        if (Object.keys(errors).length > 0) {
            hasError = true;
        }
        if (reqQuestions) {
            for (var i = 0; i <= reqQuestions.length - 1; i++) {
                if (!inputs.hasOwnProperty(reqQuestions[i])) {
                    console.log("no own property");
                    isIncomplete = true;
                    break;
                }
            }
        }
        // if theres an error or incomplete form but the step is set as complete, set to false
        if ((hasError || isIncomplete) && currentStepComplete) {
            updateStepCompletionStatus(false);
        }
        else if (!hasError && !isIncomplete && !currentStepComplete) {
            updateStepCompletionStatus(true);
        }
    }
    function submitForm(e) {
        e.preventDefault();
        postUserUpdates();
        console.log("in the submit form");
        history.push("/home");
    }
    function postUserUpdates() {
        return __awaiter(this, void 0, void 0, function () {
            var data, result, data_2, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(inputs);
                        data = {
                            job_title: inputs.title,
                            company_name: inputs.company,
                            company_city: null,
                            industry: null,
                            sexuality: inputs.sexuality,
                            age: inputs.age,
                            gender: inputs.gender,
                            race: inputs.race,
                            city: inputs.city,
                            state: inputs.state,
                            employee_type: inputs.employeeType,
                            years_at_company: inputs.yearsTenure,
                            years_of_experience: inputs.yearsExperience,
                            base_salary: inputs.annualIncome,
                            annual_bonus: inputs.annualBonus,
                            stock_options: inputs.stockOptions,
                            signing_bonus: null,
                            full_time_status: inputs.ftStatus,
                            active: true,
                        };
                        console.log(data);
                        return [4 /*yield*/, fetch("/api/onboardUser", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(data),
                            })];
                    case 1:
                        result = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, result.json()];
                    case 3:
                        data_2 = _a.sent();
                        console.log(data_2);
                        return [3 /*break*/, 5];
                    case 4:
                        err_2 = _a.sent();
                        return [2 /*return*/, err_2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    function renderIncomeQuestions() {
        if (inputs.employeeType === "Salary") {
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("br", null),
                react_1.default.createElement("br", null),
                react_1.default.createElement(core_1.TextField, { required: true, error: errors.hasOwnProperty("annualIncome") ? true : false, helperText: errors.hasOwnProperty("annualIncome")
                        ? errors["annualIncome"]
                        : "", id: "annual-income-input", label: "Annual Income (pre-tax)", variant: "outlined", name: "annualIncome", 
                    // prepends $ at the beginning of the input
                    InputProps: {
                        startAdornment: (react_1.default.createElement(core_1.InputAdornment, { position: "start" }, "$")),
                    }, onChange: handleChange }),
                react_1.default.createElement("br", null),
                react_1.default.createElement("br", null),
                react_1.default.createElement(core_1.TextField, { required: true, id: "bonus-input", label: "Last annual bonus", error: errors.hasOwnProperty("annualBonus") ? true : false, helperText: errors.hasOwnProperty("annualBonus") ? errors["annualBonus"] : "", 
                    // helperText="Incorrect entry."
                    variant: "outlined", name: "annualBonus", 
                    // prepends $ at the beginning of the input
                    InputProps: {
                        startAdornment: (react_1.default.createElement(core_1.InputAdornment, { position: "start" }, "$")),
                    }, onChange: handleChange }),
                react_1.default.createElement("br", null),
                react_1.default.createElement("br", null),
                react_1.default.createElement(core_1.TextField, { required: true, id: "stock-options-input", label: "Total stock options ", 
                    // helperText="Incorrect entry."
                    error: errors.hasOwnProperty("stockOptions") ? true : false, helperText: errors.hasOwnProperty("stockOptions")
                        ? errors["stockOptions"]
                        : "", variant: "outlined", name: "stockOptions", onChange: handleChange })));
        }
        else if (inputs.employeeType === "Hourly") {
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("br", null),
                react_1.default.createElement("br", null),
                react_1.default.createElement(core_1.TextField, { required: true, id: "hourly-wage-input", label: "Hourly wage (pre-tax)", 
                    // helperText="Incorrect entry."
                    variant: "outlined", name: "hourlyWage", 
                    // prepends $ at the beginning of the input
                    InputProps: {
                        startAdornment: (react_1.default.createElement(core_1.InputAdornment, { position: "start" }, "$")),
                    }, onChange: handleChange, error: errors.hasOwnProperty("hourlyWage") ? true : false, helperText: errors.hasOwnProperty("hourlyWage") ? errors["hourlyWage"] : "" }),
                react_1.default.createElement("br", null),
                react_1.default.createElement("br", null),
                react_1.default.createElement(core_1.FormControl, { component: "fieldset" },
                    react_1.default.createElement(core_1.FormLabel, { component: "legend" }),
                    react_1.default.createElement(core_1.RadioGroup, { "aria-label": "Part time or full time?", name: "ftStatus", onChange: handleChange },
                        react_1.default.createElement(core_1.FormControlLabel, { value: "Part Time", control: react_1.default.createElement(core_1.Radio, null), label: "Part Time" }),
                        react_1.default.createElement(core_1.FormControlLabel, { value: "Full Time", control: react_1.default.createElement(core_1.Radio, null), label: "Part Time" })))));
        }
    }
    function renderNextStep() {
        // Intro step is basic user education about what this app does
        if (step === "intro") {
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("h1", null, "How this works"),
                react_1.default.createElement("h3", null,
                    "We're about to ask you for deeply personal information, including your income, gender, race, and sexuality ",
                    react_1.default.createElement("br", null),
                    react_1.default.createElement("br", null),
                    "All data is encrypted and will only be viewable by individuals at your company with your same title ",
                    react_1.default.createElement("br", null),
                    react_1.default.createElement("br", null),
                    "Keeping your information personally identifiable is crucial for building trust in this system. ",
                    react_1.default.createElement("br", null),
                    react_1.default.createElement("br", null),
                    "Accurate and complete information is essential for ending workplace discrimination ",
                    react_1.default.createElement("br", null)),
                react_1.default.createElement(core_1.Button
                // {inputs.keys.length > 0 ? disabled : color="primary"}
                , { 
                    // {inputs.keys.length > 0 ? disabled : color="primary"}
                    color: "primary", variant: "contained", onClick: function () { return moveToNextStep(); } }, "Next")));
        }
        // enter company information
        else if (step === "company") {
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(core_1.TextField, { required: true, id: "company", key: "company", label: "Company", 
                    // helperText="Incorrect entry."
                    variant: "outlined", name: "company", onChange: handleChange, error: errors.hasOwnProperty("company") ? true : false, helperText: errors.hasOwnProperty("company") ? errors["company"] : "" }),
                react_1.default.createElement("br", null),
                react_1.default.createElement("br", null),
                react_1.default.createElement(core_1.TextField, { required: true, id: "city", key: "city", label: "City", 
                    // helperText="Incorrect entry."
                    variant: "outlined", name: "city", onChange: handleChange, error: errors.hasOwnProperty("city") ? true : false, helperText: errors.hasOwnProperty("city") ? errors["city"] : "" }),
                react_1.default.createElement("br", null),
                react_1.default.createElement("br", null),
                react_1.default.createElement(core_1.TextField, { required: true, id: "state", key: "state", label: "State", 
                    // helperText="Incorrect entry."
                    variant: "outlined", name: "state", onChange: handleChange, error: errors.hasOwnProperty("state") ? true : false, helperText: errors.hasOwnProperty("state") ? errors["state"] : "" }),
                react_1.default.createElement("br", null),
                react_1.default.createElement("br", null),
                react_1.default.createElement(core_1.Button
                // {inputs.keys.length > 0 ? disabled : color="primary"}
                , { 
                    // {inputs.keys.length > 0 ? disabled : color="primary"}
                    color: "primary", variant: "contained", onClick: function () { return moveToNextStep(); }, disabled: !currentStepComplete }, "Next")));
        }
        else if (step === "title") {
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(core_1.TextField, { required: true, id: "years-experience-input", key: "years-experience-input", label: "# years in this industry", 
                    // helperText="Incorrect entry."
                    variant: "outlined", name: "yearsExperience", onChange: handleChange, error: errors.hasOwnProperty("yearsExperience") ? true : false, helperText: errors.hasOwnProperty("yearsExperience")
                        ? errors["yearsExperience"]
                        : "" }),
                react_1.default.createElement("br", null),
                react_1.default.createElement("br", null),
                react_1.default.createElement(core_1.TextField, { required: true, id: "years-tenure", key: "years-tenure", label: "# years at company", 
                    // helperText="Incorrect entry."
                    variant: "outlined", name: "yearsTenure", onChange: handleChange, error: errors.hasOwnProperty("yearsTenure") ? true : false, helperText: errors.hasOwnProperty("yearsTenure") ? errors["yearsTenure"] : "" }),
                react_1.default.createElement("br", null),
                react_1.default.createElement("br", null),
                react_1.default.createElement("p", null,
                    " ",
                    "You'll only be compared to people at your company with your same title. Here are the titles that other employees at your company have used:"),
                react_1.default.createElement(TitleCount_jsx_1.default, { titles: titleCount }),
                react_1.default.createElement("br", null),
                react_1.default.createElement(core_1.TextField, { required: true, id: "title", label: "Title", key: "title", 
                    // helperText="Incorrect entry."
                    variant: "outlined", name: "title", onChange: handleChange, error: errors.hasOwnProperty("title") ? true : false, helperText: errors.hasOwnProperty("title") ? errors["title"] : "" }),
                react_1.default.createElement("br", null),
                react_1.default.createElement("br", null),
                react_1.default.createElement(core_1.Button
                // {inputs.keys.length > 0 ? disabled : color="primary"}
                , { 
                    // {inputs.keys.length > 0 ? disabled : color="primary"}
                    disabled: !currentStepComplete, color: "primary", variant: "contained", onClick: function () { return moveToNextStep(); } }, "Next")));
        }
        // Income step is to gather income data for the user's current role
        else if (step === "income") {
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("form", { autoComplete: "off" },
                    react_1.default.createElement("br", null),
                    react_1.default.createElement("br", null),
                    react_1.default.createElement(core_1.FormControl, { component: "fieldset" },
                        react_1.default.createElement(core_1.FormLabel, { component: "legend" }, "How are you paid?"),
                        react_1.default.createElement(core_1.RadioGroup, { "aria-label": "employee type", name: "employeeType", onChange: handleChange },
                            react_1.default.createElement(core_1.FormControlLabel, { value: "Salary", control: react_1.default.createElement(core_1.Radio, null), label: "Salary" }),
                            react_1.default.createElement(core_1.FormControlLabel, { value: "Hourly", control: react_1.default.createElement(core_1.Radio, null), label: "Hourly" }))),
                    renderIncomeQuestions(),
                    react_1.default.createElement("br", null),
                    react_1.default.createElement("br", null)),
                react_1.default.createElement(core_1.Button
                // {inputs.keys.length > 0 ? disabled : color="primary"}
                , { 
                    // {inputs.keys.length > 0 ? disabled : color="primary"}
                    disabled: !currentStepComplete, color: "primary", variant: "contained", onClick: function () { return moveToNextStep(); } }, "Next")));
        }
        else if (step === "personal") {
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(core_1.FormControl, { component: "fieldset" },
                    react_1.default.createElement(core_1.FormLabel, { component: "legend" }, "What race your identify with?"),
                    react_1.default.createElement(core_1.RadioGroup, { "aria-label": "race", name: "race", onChange: handleChange },
                        react_1.default.createElement(core_1.FormControlLabel, { value: "White", control: react_1.default.createElement(core_1.Radio, null), label: "White" }),
                        react_1.default.createElement(core_1.FormControlLabel, { value: "Black", control: react_1.default.createElement(core_1.Radio, null), label: "Black" }),
                        react_1.default.createElement(core_1.FormControlLabel, { value: "Latino", control: react_1.default.createElement(core_1.Radio, null), label: "Latino" }),
                        react_1.default.createElement(core_1.FormControlLabel, { value: "Asian", control: react_1.default.createElement(core_1.Radio, null), label: "Asian" }))),
                react_1.default.createElement("br", null),
                react_1.default.createElement("br", null),
                react_1.default.createElement(core_1.FormControl, { component: "fieldset" },
                    react_1.default.createElement(core_1.FormLabel, { component: "legend" }, "What gender do you identify with?"),
                    react_1.default.createElement(core_1.RadioGroup, { "aria-label": "gender", name: "gender", onChange: handleChange },
                        react_1.default.createElement(core_1.FormControlLabel, { value: "Male", control: react_1.default.createElement(core_1.Radio, null), label: "Male" }),
                        react_1.default.createElement(core_1.FormControlLabel, { value: "Female", control: react_1.default.createElement(core_1.Radio, null), label: "Female" }),
                        react_1.default.createElement(core_1.FormControlLabel, { value: "Other", control: react_1.default.createElement(core_1.Radio, null), label: "Other" }))),
                react_1.default.createElement("br", null),
                react_1.default.createElement("br", null),
                react_1.default.createElement(core_1.FormControl, { component: "fieldset" },
                    react_1.default.createElement(core_1.FormLabel, { component: "legend" }, "Do you consider yourself a member of the LGBTQ community?"),
                    react_1.default.createElement(core_1.RadioGroup, { "aria-label": "sexuality", name: "sexuality", onChange: handleChange },
                        react_1.default.createElement(core_1.FormControlLabel, { value: "Yes", control: react_1.default.createElement(core_1.Radio, null), label: "Yes" }),
                        react_1.default.createElement(core_1.FormControlLabel, { value: "No", control: react_1.default.createElement(core_1.Radio, null), label: "No" }))),
                react_1.default.createElement("br", null),
                react_1.default.createElement("br", null),
                react_1.default.createElement(core_1.FormControl, { component: "fieldset" },
                    react_1.default.createElement(core_1.FormLabel, { component: "legend" }, "Age"),
                    react_1.default.createElement(core_1.RadioGroup, { "aria-label": "age", name: "age", onChange: handleChange },
                        react_1.default.createElement(core_1.FormControlLabel, { value: "18 - 35", control: react_1.default.createElement(core_1.Radio, null), label: "18 - 35" }),
                        react_1.default.createElement(core_1.FormControlLabel, { value: "36 - 50", control: react_1.default.createElement(core_1.Radio, null), label: "36 - 50" }),
                        react_1.default.createElement(core_1.FormControlLabel, { value: "51 +", control: react_1.default.createElement(core_1.Radio, null), label: "51 +" }))),
                react_1.default.createElement("br", null),
                react_1.default.createElement("br", null),
                react_1.default.createElement(core_1.Button
                // {...inputs.keys.length > 0 ? ' ': disabled}
                , { 
                    // {...inputs.keys.length > 0 ? ' ': disabled}
                    disabled: !currentStepComplete, 
                    // disabled
                    color: "primary", variant: "contained", onClick: submitForm }, "Complete")));
        }
    }
    return (react_1.default.createElement(core_1.Container, { maxWidth: "sm" },
        react_1.default.createElement("br", null),
        react_1.default.createElement("br", null),
        renderNextStep()));
}
exports.default = GetStarted;
//# sourceMappingURL=GetStarted.js.map