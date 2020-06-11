"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
var react_dom_1 = require("react-dom");
var App_jsx_1 = __importDefault(require("./App.jsx"));
require("regenerator-runtime/runtime");
react_dom_1.render(react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
    react_1.default.createElement(App_jsx_1.default, null)), document.getElementById("root"));
//# sourceMappingURL=index.js.map