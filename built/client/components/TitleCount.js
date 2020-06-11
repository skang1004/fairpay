"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
function TitleCount(props) {
    function renderTitles() {
        var output = [];
        for (var i = 0; i <= props.titles.length - 1; i++) {
            var elem = (react_1.default.createElement("p", { key: i },
                props.titles[i].job_title,
                ": ",
                props.titles[i].total,
                " submissions"));
            output.push(elem);
        }
        return output;
    }
    console.log(props.titles);
    return (react_1.default.createElement("div", null, props.titles ? renderTitles() : ''));
}
exports.default = TitleCount;
//# sourceMappingURL=TitleCount.js.map