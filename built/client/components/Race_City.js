"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var core_1 = require("@material-ui/core");
var RaceChart_js_1 = __importDefault(require("./RaceChart.js"));
function RaceCity(props) {
    var sliced = props.raceList;
    console.log(sliced);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { hidden: props.value !== props.index },
            react_1.default.createElement("div", { className: "data_display_div" },
                react_1.default.createElement(core_1.TableContainer, { component: core_1.Paper },
                    react_1.default.createElement(core_1.Table, { className: "table_displays" },
                        react_1.default.createElement(core_1.TableHead, { className: 'TableHead' },
                            react_1.default.createElement(core_1.TableRow, null,
                                react_1.default.createElement(core_1.TableCell, null, "Race"),
                                react_1.default.createElement(core_1.TableCell, { align: "right" }, "People in City"),
                                react_1.default.createElement(core_1.TableCell, { align: "right" }, "Average Salary"),
                                react_1.default.createElement(core_1.TableCell, { align: "right" }, "Average Annual Bonus"),
                                react_1.default.createElement(core_1.TableCell, { align: "right" }, "Average Stock Options"))),
                        react_1.default.createElement(core_1.TableBody, null, sliced.map(function (row) { return (react_1.default.createElement(core_1.TableRow, { key: row.race },
                            react_1.default.createElement(core_1.TableCell, null, row.race),
                            react_1.default.createElement(core_1.TableCell, { align: "right" }, row.count),
                            react_1.default.createElement(core_1.TableCell, { align: "right" },
                                "$",
                                row.avg_salary),
                            react_1.default.createElement(core_1.TableCell, { align: "right" },
                                "$",
                                row.avg_bonus),
                            react_1.default.createElement(core_1.TableCell, { align: "right" },
                                "$",
                                row.avg_stock))); }))))),
            react_1.default.createElement(RaceChart_js_1.default, { raceList: props.raceList }))));
}
exports.default = RaceCity;
//# sourceMappingURL=Race_City.js.map