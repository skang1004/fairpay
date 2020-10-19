"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
// import { useState } from "react-hooks";
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var Home_jsx_1 = __importDefault(require("./components/Home.jsx"));
var Login_jsx_1 = __importDefault(require("./components/Login.jsx"));
var GetStarted_jsx_1 = __importDefault(require("./components/GetStarted.jsx"));
var react_router_dom_1 = require("react-router-dom");
require("./components/stylesheets/styles.css");
var theme = styles_1.createMuiTheme({
    palette: {
        primary: {
            light: '#56cf7F',
            main: '#2CC45F',
            dark: '#1E8942',
            contrastText: '#ffffff',
        },
        secondary: {
            light: '#4ba06a',
            main: '#1E8945',
            dark: '#155f30',
            contrastText: '#000',
        },
    },
});
var logoURL = 'https://res.cloudinary.com/dvwvkt7iq/image/upload/v1591910325/FAIRPAY_1_tgwhms.png';
var App = function () {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(core_1.ThemeProvider, { theme: theme },
            react_1.default.createElement(core_1.AppBar, { position: "static", id: "appBar" },
                react_1.default.createElement(core_1.Tabs, { value: 0, variant: "fullWidth" },
                    react_1.default.createElement(core_1.Tab, { icon: react_1.default.createElement("img", { style: { height: '75px' }, src: logoURL }) }))),
            react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
                react_1.default.createElement(react_router_dom_1.Switch, null,
                    react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/getstarted" },
                        react_1.default.createElement(GetStarted_jsx_1.default, null)),
                    react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/home" },
                        react_1.default.createElement(Home_jsx_1.default, null)),
                    react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/" },
                        react_1.default.createElement(Login_jsx_1.default, null)))))));
};
exports.default = App;
//# sourceMappingURL=App.js.map