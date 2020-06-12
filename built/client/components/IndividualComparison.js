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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var core_1 = require("@material-ui/core");
function IndividualComparison(props) {
    // need to write logic that loops through the data we get back from the fetch request and renders
    // all the employee data who work at the same company with the same title
    var _a = react_1.useState(props.name), name = _a[0], setName = _a[1];
    var _b = react_1.useState(props.company), company = _b[0], setCompany = _b[1];
    var _c = react_1.useState(props.jobTitle), jobTitle = _c[0], setJobTitle = _c[1];
    var _d = react_1.useState(null), sexuality = _d[0], setSexuality = _d[1];
    var _e = react_1.useState(null), age = _e[0], setAge = _e[1];
    var _f = react_1.useState(), gender = _f[0], setGender = _f[1];
    var _g = react_1.useState(), race = _g[0], setRace = _g[1];
    // salary vs hourly employee
    var _h = react_1.useState(), employeeType = _h[0], setEmployeeType = _h[1];
    // years of experience in field/position
    var _j = react_1.useState(), yrsExperience = _j[0], setYrsExperience = _j[1];
    // years at current company
    var _k = react_1.useState(), yrsCompany = _k[0], setYrsCompany = _k[1];
    var _l = react_1.useState(), baseSalary = _l[0], setBaseSalary = _l[1];
    var _m = react_1.useState(), annualBonus = _m[0], setAnnualBonus = _m[1];
    // total invested and uninvested
    var _o = react_1.useState(), stockOptions = _o[0], setStockOptions = _o[1];
    var _p = react_1.useState(), signingBonus = _p[0], setSigningBonus = _p[1];
    var _q = react_1.useState(), ftStatus = _q[0], setFtStatus = _q[1];
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(core_1.Container, null,
            react_1.default.createElement("div", { hidden: props.view !== props.index, id: "individual_comparison_div" },
                react_1.default.createElement(core_1.TableContainer, { component: core_1.Paper },
                    react_1.default.createElement(core_1.Table, null,
                        react_1.default.createElement(core_1.TableHead, { className: "TableHead" },
                            react_1.default.createElement(core_1.TableRow, null,
                                react_1.default.createElement(core_1.TableCell, null, "Name"),
                                react_1.default.createElement(core_1.TableCell, { align: "right" }, "Age"),
                                react_1.default.createElement(core_1.TableCell, { align: "right" }, "Base Salary"),
                                react_1.default.createElement(core_1.TableCell, { align: "right" }, "Gender"),
                                react_1.default.createElement(core_1.TableCell, { align: "right" }, "Employee Type"),
                                react_1.default.createElement(core_1.TableCell, { align: "right" }, "LGTBQ"),
                                react_1.default.createElement(core_1.TableCell, { align: "right" }, "Years at Company"),
                                react_1.default.createElement(core_1.TableCell, { align: "right" }, "Years of Experience"))),
                        react_1.default.createElement(core_1.TableBody, null, props.allNames.map(function (key, i) {
                            return (react_1.default.createElement(core_1.TableRow, { key: i },
                                react_1.default.createElement(core_1.TableCell, null, key),
                                react_1.default.createElement(core_1.TableCell, { align: "right" }, props.allAges[i]),
                                react_1.default.createElement(core_1.TableCell, { align: "right" },
                                    "$",
                                    props.allBaseSalary[i]),
                                react_1.default.createElement(core_1.TableCell, { align: "right" }, props.allGenders[i]),
                                react_1.default.createElement(core_1.TableCell, { align: "right" }, props.allTypes[i]),
                                react_1.default.createElement(core_1.TableCell, { align: "right" }, props.allSexes[i]),
                                react_1.default.createElement(core_1.TableCell, { align: "right" }, props.allYrsCompany[i]),
                                react_1.default.createElement(core_1.TableCell, { align: "right" }, props.allYrsExperience[i])));
                        }))))))));
}
exports.default = IndividualComparison;
//# sourceMappingURL=IndividualComparison.js.map