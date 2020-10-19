"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var core_1 = require("@material-ui/core");
var GenderChart_js_1 = __importDefault(require("./GenderChart.js"));
function Gender(props) {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { hidden: props.value !== props.index },
            react_1.default.createElement("div", { className: "data_display_div" },
                react_1.default.createElement(core_1.TableContainer, { component: core_1.Paper },
                    react_1.default.createElement(core_1.Table, { className: "table_displays" },
                        react_1.default.createElement(core_1.TableHead, { className: "TableHead" },
                            react_1.default.createElement(core_1.TableRow, null,
                                react_1.default.createElement(core_1.TableCell, null, "Gender"),
                                react_1.default.createElement(core_1.TableCell, { align: "right" }, "People in Company"),
                                react_1.default.createElement(core_1.TableCell, { align: "right" }, "Average Salary"),
                                react_1.default.createElement(core_1.TableCell, { align: "right" }, "Average Annual Bonus"),
                                react_1.default.createElement(core_1.TableCell, { align: "right" }, "Average Stock Options"))),
                        react_1.default.createElement(core_1.TableBody, null, props.genderList.map(function (row, index) {
                            if (index % 2 === 1) {
                                return (react_1.default.createElement(core_1.TableRow, { className: "table-row", key: row.gender },
                                    react_1.default.createElement(core_1.TableCell, null, row.gender),
                                    react_1.default.createElement(core_1.TableCell, { align: "right" }, row.count),
                                    react_1.default.createElement(core_1.TableCell, { align: "right" },
                                        "$",
                                        row.avg_salary),
                                    react_1.default.createElement(core_1.TableCell, { align: "right" },
                                        "$",
                                        row.avg_bonus),
                                    react_1.default.createElement(core_1.TableCell, { align: "right" },
                                        "$",
                                        row.avg_stock)));
                            }
                            else {
                                return (react_1.default.createElement(core_1.TableRow, { key: row.gender },
                                    react_1.default.createElement(core_1.TableCell, null, row.gender),
                                    react_1.default.createElement(core_1.TableCell, { align: "right" }, row.count),
                                    react_1.default.createElement(core_1.TableCell, { align: "right" },
                                        "$",
                                        row.avg_salary),
                                    react_1.default.createElement(core_1.TableCell, { align: "right" },
                                        "$",
                                        row.avg_bonus),
                                    react_1.default.createElement(core_1.TableCell, { align: "right" },
                                        "$",
                                        row.avg_stock)));
                            }
                        }))))),
            react_1.default.createElement(GenderChart_js_1.default, { genderList: props.genderList }))));
}
exports.default = Gender;
//# sourceMappingURL=Gender_Company.js.map