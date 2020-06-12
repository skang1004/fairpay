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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var core_1 = require("@material-ui/core");
var Race_City_jsx_1 = __importDefault(require("./Race_City.jsx"));
var Age_City_jsx_1 = __importDefault(require("./Age_City.jsx"));
var Gender_City_jsx_1 = __importDefault(require("./Gender_City.jsx"));
var Total_City_jsx_1 = __importDefault(require("./Total_City.jsx"));
function CompanyComparison(props) {
    var _a = react_1.useState(0), value = _a[0], setValue = _a[1];
    var changeGraph = function (e, newValue) {
        setValue(newValue);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { hidden: props.view !== props.index },
            react_1.default.createElement(core_1.Container, null,
                react_1.default.createElement("div", { className: "category_container" },
                    react_1.default.createElement("div", { className: "category_comparison_div" },
                        react_1.default.createElement(core_1.Tabs, { orientation: "vertical", variant: "scrollable", value: value, onChange: changeGraph, className: "vertical_tab_bar" },
                            react_1.default.createElement(core_1.Tab, { label: "Total" }),
                            react_1.default.createElement(core_1.Tab, { label: "Race" }),
                            react_1.default.createElement(core_1.Tab, { label: "Age" }),
                            react_1.default.createElement(core_1.Tab, { label: "Gender" }))))),
            react_1.default.createElement(core_1.Box, null,
                react_1.default.createElement(Total_City_jsx_1.default, { allNames: props.allNames, userSalary: props.baseSalary, userAnnualBonus: props.annualBonus, userStockOptions: props.stockOptions, aggregateList: props.aggregateList, view: props.view, value: value, index: 0 })),
            react_1.default.createElement(core_1.Box, null,
                react_1.default.createElement(Race_City_jsx_1.default, { raceList: props.raceList, view: props.view, value: value, index: 1 })),
            react_1.default.createElement(core_1.Box, null,
                react_1.default.createElement(Age_City_jsx_1.default, { view: props.view, value: value, index: 2, ageList: props.ageList })),
            react_1.default.createElement(core_1.Box, null,
                react_1.default.createElement(Gender_City_jsx_1.default, { view: props.view, value: value, index: 3, genderList: props.genderList })))));
}
exports.default = CompanyComparison;
//# sourceMappingURL=CityComparison.js.map