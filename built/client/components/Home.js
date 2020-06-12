"use strict";
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
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
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
var core_1 = require("@material-ui/core");
var CompanyComparison_jsx_1 = __importDefault(require("./CompanyComparison.jsx"));
var IndividualComparison_jsx_1 = __importDefault(require("./IndividualComparison.jsx"));
var CityComparison_jsx_1 = __importDefault(require("./CityComparison.jsx"));
// const styles = {
//   tabBar: {
//     backgroundColor: '#ffe082',
//     color: 'rgb(102, 102, 102)',
//   },
// };
function Home(props) {
    var _this = this;
    // this is the hook that toggles the different comparison views
    // defaults to company comparison view
    var _a = react_1.useState(0), view = _a[0], setView = _a[1];
    var handleComparison = function (e, view) {
        setView(view);
    };
    // this is name of employee
    var _b = react_1.useState(null), name = _b[0], setName = _b[1];
    var _c = react_1.useState(null), company = _c[0], setCompany = _c[1];
    var _d = react_1.useState(null), image = _d[0], setImage = _d[1];
    var _e = react_1.useState(null), city = _e[0], setCity = _e[1];
    // this is job title
    var _f = react_1.useState(null), jobTitle = _f[0], setJobTitle = _f[1];
    // this is sexual orientation
    var _g = react_1.useState(null), sexuality = _g[0], setSexuality = _g[1];
    var _h = react_1.useState(null), age = _h[0], setAge = _h[1];
    var _j = react_1.useState(), gender = _j[0], setGender = _j[1];
    var _k = react_1.useState(), race = _k[0], setRace = _k[1];
    // salary vs hourly employee
    var _l = react_1.useState(), employeeType = _l[0], setEmployeeType = _l[1];
    // years of experience in field/position
    var _m = react_1.useState(), yrsExperience = _m[0], setYrsExperience = _m[1];
    // years at current company
    var _o = react_1.useState(), yrsCompany = _o[0], setYrsCompany = _o[1];
    var _p = react_1.useState(), baseSalary = _p[0], setBaseSalary = _p[1];
    var _q = react_1.useState(), annualBonus = _q[0], setAnnualBonus = _q[1];
    // total invested and uninvested
    var _r = react_1.useState(), stockOptions = _r[0], setStockOptions = _r[1];
    var _s = react_1.useState(), signingBonus = _s[0], setSigningBonus = _s[1];
    var _t = react_1.useState(), ftStatus = _t[0], setFtStatus = _t[1];
    // this section is for individual comparison component
    var _u = react_1.useState([]), allNames = _u[0], setAllNames = _u[1];
    var _v = react_1.useState([]), allSexes = _v[0], setAllSexes = _v[1];
    var _w = react_1.useState([]), allGenders = _w[0], setAllGenders = _w[1];
    var _x = react_1.useState([]), allAges = _x[0], setAllAges = _x[1];
    var _y = react_1.useState([]), allTypes = _y[0], setAllTypes = _y[1];
    var _z = react_1.useState([]), allYrsExperience = _z[0], setAllYrsExperience = _z[1];
    var _0 = react_1.useState([]), allYrsCompany = _0[0], setAllYrsCompany = _0[1];
    var _1 = react_1.useState([]), allBaseSalary = _1[0], setAllBaseSalary = _1[1];
    var _2 = react_1.useState([]), allAnnualBonus = _2[0], setAllAnnualBonus = _2[1];
    var _3 = react_1.useState([]), allStockOptions = _3[0], setAllStockOptions = _3[1];
    var _4 = react_1.useState([]), allSigningBonuses = _4[0], setAllSigningBonuses = _4[1];
    var _5 = react_1.useState([]), allFtStatuses = _5[0], setAllFtStatuses = _5[1];
    var _6 = react_1.useState([]), raceList = _6[0], setRaceList = _6[1];
    var _7 = react_1.useState([]), genderList = _7[0], setGenderList = _7[1];
    var _8 = react_1.useState([]), ageList = _8[0], setAgeList = _8[1];
    var _9 = react_1.useState([]), aggregateList = _9[0], setAggregateList = _9[1];
    var _10 = react_1.useState([]), raceByCityList = _10[0], setRaceByCityList = _10[1];
    var _11 = react_1.useState([]), genderByCityList = _11[0], setGenderByCityList = _11[1];
    var _12 = react_1.useState([]), ageByCityList = _12[0], setAgeByCityList = _12[1];
    var _13 = react_1.useState([]), aggregateByCityList = _13[0], setAggregateByCityList = _13[1];
    // state for whether fetch call is finished
    var _14 = react_1.useState(true), loading = _14[0], setLoading = _14[1];
    // used for prop drilling into child components
    var employeesNames = [];
    var employeesImage = [];
    var employeesSexuality = [];
    var employeesGender = [];
    var employeesAge = [];
    var employeesType = [];
    var employeesYrsExperience = [];
    var employeesYrsCompany = [];
    var employeesBaseSalary = [];
    var employeesAnnualBonus = [];
    var employeesStockOptions = [];
    var employeesSigningBonus = [];
    var employeesFtStatus = [];
    var raceAvg = [];
    var genderAvg = [];
    var ageAvg = [];
    var aggregateAvg = [];
    // new citywide averages
    var raceByCityAvg = [];
    var genderByCityAvg = [];
    var ageByCityAvg = [];
    var aggregateByCityAvg = [];
    react_1.useEffect(function () {
        console.log('this is our cookie   ', document.cookie);
        var user_linkedin_id = document.cookie;
        user_linkedin_id = user_linkedin_id
            .split('; ')
            .find(function (row) { return row.startsWith('userId'); })
            .split('=')[1];
        var image_url = document.cookie;
        image_url = image_url
            .split('; ')
            .find(function (row) { return row.startsWith('image_url'); })
            .split('=')[1];
        console.log('this is our image url   ', image_url.toString());
        setLoading(true);
        console.log('Data about to be fetch and wait.');
        var asyncDataFetch = function () { return __awaiter(_this, void 0, void 0, function () {
            var response, data, current, decodedImage_URL, raceList_1, genderList_1, ageList_1, aggregateList_1, list, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch("/api/company/" + user_linkedin_id)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        current = data.currentUser;
                        console.log('this is the current users info', current);
                        // server added middlewares that grab city wide comparisons, have to parse that from data variable and store in new states
                        console.log('this is data from fetch in home component', data);
                        console.log('image_url   ', decodeURIComponent(image_url));
                        decodedImage_URL = decodeURIComponent(image_url);
                        // setting state for current logged in user
                        setName(current.name);
                        setCompany(current.linkedin_id);
                        setJobTitle(current.job_title);
                        setCity(current.city);
                        setSexuality(current.sexuality);
                        setAge(current.age);
                        setGender(current.gender);
                        setRace(current.race);
                        setEmployeeType(current.employee_type);
                        setYrsExperience(current.years_of_experience);
                        setYrsCompany(current.years_at_company);
                        setBaseSalary(current.base_salary);
                        setAnnualBonus(current.annual_bonus);
                        setStockOptions(current.stock_options);
                        setSigningBonus(current.signing_bonus);
                        setFtStatus(current.full_time_status);
                        setImage(decodedImage_URL);
                        raceList_1 = data.raceStats;
                        raceList_1.forEach(function (race) {
                            raceAvg.push({
                                race: race.race,
                                avg_bonus: race.avg_bonus,
                                avg_salary: race.avg_salary,
                                avg_stock: race.avg_stock_options,
                                count: race.count,
                            });
                        });
                        setRaceList(raceAvg);
                        //grabbing race by city averages
                        data.raceStatsByCity.forEach(function (race) {
                            raceByCityAvg.push({
                                race: race.race,
                                avg_bonus: race.avg_bonus,
                                avg_salary: race.avg_salary,
                                avg_stock: race.avg_stock_options,
                                count: race.count,
                            });
                        });
                        setRaceByCityList(raceByCityAvg);
                        genderList_1 = data.genderStats;
                        genderList_1.forEach(function (gender) {
                            genderAvg.push({
                                gender: gender.gender,
                                avg_bonus: gender.avg_bonus,
                                avg_salary: gender.avg_salary,
                                avg_stock: gender.avg_stock_options,
                                count: gender.count,
                            });
                        });
                        setGenderList(genderAvg);
                        // grabbing gender by city averages
                        data.genderStatsByCity.forEach(function (gender) {
                            genderByCityAvg.push({
                                gender: gender.gender,
                                avg_bonus: gender.avg_bonus,
                                avg_salary: gender.avg_salary,
                                avg_stock: gender.avg_stock_options,
                                count: gender.count,
                            });
                        });
                        setGenderByCityList(genderByCityAvg);
                        ageList_1 = data.ageStats;
                        ageList_1.forEach(function (age) {
                            ageAvg.push({
                                age: age.age,
                                avg_salary: age.avg_salary,
                                avg_bonus: age.avg_bonus,
                                avg_stock: age.avg_stock_options,
                                count: age.count,
                            });
                        });
                        setAgeList(ageAvg);
                        //grabbing age averages by city
                        data.ageStatsByCity.forEach(function (age) {
                            ageByCityAvg.push({
                                age: age.age,
                                avg_salary: age.avg_salary,
                                avg_bonus: age.avg_bonus,
                                avg_stock: age.avg_stock_options,
                                count: age.count,
                            });
                        });
                        setAgeByCityList(ageByCityAvg);
                        aggregateList_1 = data.jobStats;
                        aggregateList_1.forEach(function (item) {
                            aggregateAvg.push({
                                avg_salary: item.avg_salary,
                                avg_bonus: item.avg_bonus,
                                avg_stock: item.avg_stock_options,
                                title: item.job_title,
                                count: item.count,
                            });
                        });
                        setAggregateList(aggregateAvg);
                        // calculating values for aggregate by city view
                        data.jobStatsByCity.forEach(function (item) {
                            aggregateByCityAvg.push({
                                avg_salary: item.avg_salary,
                                avg_bonus: item.avg_bonus,
                                avg_stock: item.avg_stock_options,
                                title: item.job_title,
                                count: item.count,
                            });
                        });
                        setAggregateByCityList(aggregateByCityAvg);
                        list = data.companyData;
                        list.forEach(function (employee) {
                            employeesNames.push(employee.name);
                            employeesAge.push(employee.age);
                            employeesGender.push(employee.gender);
                            employeesSexuality.push(employee.sexuality);
                            employeesType.push(employee.employee_type);
                            employeesYrsExperience.push(employee.years_of_experience);
                            employeesYrsCompany.push(employee.years_at_company);
                            employeesBaseSalary.push(employee.base_salary);
                            employeesAnnualBonus.push(employee.annual_bonus);
                            employeesStockOptions.push(employee.stock_options);
                            employeesSigningBonus.push(employee.signing_bonus);
                            employeesFtStatus.push(employee.full_time_status);
                        });
                        setAllNames(employeesNames);
                        setAllGenders(employeesGender);
                        setAllAges(employeesAge);
                        setAllSexes(employeesSexuality);
                        setAllTypes(employeesType);
                        setAllYrsExperience(employeesYrsExperience);
                        setAllYrsCompany(employeesYrsCompany);
                        setAllBaseSalary(employeesBaseSalary);
                        setAllFtStatuses(employeesFtStatus);
                        // after finishing this execution, set loading to false
                        setLoading(false);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        return [2 /*return*/, err_1];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        asyncDataFetch();
    }, []);
    var classes = props.classes;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        loading ? null : (react_1.default.createElement("div", { className: 'current_user_header' },
            react_1.default.createElement("h2", { id: 'current_user_name' },
                "Hello ",
                name),
            react_1.default.createElement("img", { src: image, className: "linkedinImage" }),
            react_1.default.createElement("label", { id: 'current_user_label' },
                jobTitle,
                " at ",
                company,
                " in ",
                city))),
        react_1.default.createElement(core_1.Container, { id: 'comparison_tabs' },
            react_1.default.createElement(core_1.AppBar, { id: 'company_individual_toggle', position: 'static', width: 500 },
                react_1.default.createElement(core_1.Tabs, { value: view, view: view, onChange: handleComparison, centered: true },
                    react_1.default.createElement(core_1.Tab, { label: 'Company-Wide' }),
                    react_1.default.createElement(core_1.Tab, { label: 'City-Wide' }),
                    react_1.default.createElement(core_1.Tab, { label: 'Individual' })))),
        loading ? (react_1.default.createElement("h2", { className: 'current_user_header' }, "Loading Data...")) : (react_1.default.createElement("div", null,
            react_1.default.createElement("div", { id: 'tables_div' },
                react_1.default.createElement(core_1.Container, null,
                    react_1.default.createElement(CompanyComparison_jsx_1.default, { view: view, index: 0, name: name, company: company, jobTitle: jobTitle, sexuality: sexuality, age: age, gender: gender, race: race, employeeType: employeeType, yrsExperience: yrsExperience, yrsCompany: yrsCompany, baseSalary: baseSalary, annualBonus: annualBonus, stockOptions: stockOptions, signingBonus: signingBonus, ftStatus: ftStatus, raceList: raceList, genderList: genderList, ageList: ageList, aggregateList: aggregateList, allNames: allNames, loading: loading }),
                    react_1.default.createElement(CityComparison_jsx_1.default, { view: view, index: 1, name: name, company: company, jobTitle: jobTitle, sexuality: sexuality, age: age, gender: gender, race: race, employeeType: employeeType, yrsExperience: yrsExperience, yrsCompany: yrsCompany, baseSalary: baseSalary, annualBonus: annualBonus, stockOptions: stockOptions, signingBonus: signingBonus, ftStatus: ftStatus, raceList: raceByCityList, genderList: genderByCityList, ageList: ageByCityList, aggregateList: aggregateByCityList, allNames: allNames }),
                    react_1.default.createElement(IndividualComparison_jsx_1.default, { view: view, index: 2, name: name, company: company, jobTitle: jobTitle, sexuality: sexuality, age: age, gender: gender, race: race, employeeType: employeeType, yrsExperience: yrsExperience, yrsCompany: yrsCompany, baseSalary: baseSalary, annualBonus: annualBonus, stockOptions: stockOptions, signingBonus: signingBonus, ftStatus: ftStatus, allNames: allNames, allGenders: allGenders, allAges: allAges, allSexes: allSexes, allTypes: allTypes, allYrsExperience: allYrsExperience, allYrsCompany: allYrsCompany, allBaseSalary: allBaseSalary })))))));
}
exports.default = Home;
//# sourceMappingURL=Home.js.map