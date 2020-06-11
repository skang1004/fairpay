"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
// import { useState } from "react-hooks";
function Login(props) {
    //   console.log("props vs index", props.value, props.index);
    return (react_1.default.createElement("div", { className: "welcome" },
        react_1.default.createElement("h1", null, "Be an agent of change."),
        react_1.default.createElement("h2", null, "Securely submit your salary information to understand if you or your coworkers are being discriminated against."),
        react_1.default.createElement("a", { href: "/auth/linkedin" },
            react_1.default.createElement("img", { src: "https://taggbox.com/blog/wp-content/uploads/2018/09/Signin-with-LinkedIn.png", id: "linkedinButton" }))));
}
exports.default = Login;
//# sourceMappingURL=Login.js.map