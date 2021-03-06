"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var CompanyChart_js_1 = __importDefault(require("./CompanyChart.js"));
var core_1 = require("@material-ui/core");
function Total(props) {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { hidden: props.value !== props.index },
            react_1.default.createElement("div", { className: 'data_display_div' },
                react_1.default.createElement(core_1.TableContainer, { component: core_1.Paper },
                    react_1.default.createElement(core_1.Table, { className: 'table_displays', color: 'primary' },
                        react_1.default.createElement(core_1.TableHead, { className: 'TableHead' },
                            react_1.default.createElement(core_1.TableRow, null,
                                react_1.default.createElement(core_1.TableCell, null, "All Employees"),
                                react_1.default.createElement(core_1.TableCell, { align: 'right' }, "Average Salary"),
                                react_1.default.createElement(core_1.TableCell, { align: 'right' }, "Average Annual Bonus"),
                                react_1.default.createElement(core_1.TableCell, { align: 'right' }, "Average Stock Options"))),
                        react_1.default.createElement(core_1.TableBody, null, props.aggregateList.map(function (row, index) {
                            if (index % 2 === 1) {
                                return (react_1.default.createElement(core_1.TableRow, { className: 'table-row', key: row },
                                    react_1.default.createElement(core_1.TableCell, null, row.count),
                                    react_1.default.createElement(core_1.TableCell, { align: 'right' },
                                        "$",
                                        row.avg_salary),
                                    react_1.default.createElement(core_1.TableCell, { align: 'right' },
                                        "$",
                                        row.avg_bonus),
                                    react_1.default.createElement(core_1.TableCell, { align: 'right' },
                                        "$",
                                        row.avg_stock)));
                            }
                            else {
                                return (react_1.default.createElement(core_1.TableRow, { key: row },
                                    react_1.default.createElement(core_1.TableCell, null, row.count),
                                    react_1.default.createElement(core_1.TableCell, { align: 'right' },
                                        "$",
                                        row.avg_salary),
                                    react_1.default.createElement(core_1.TableCell, { align: 'right' },
                                        "$",
                                        row.avg_bonus),
                                    react_1.default.createElement(core_1.TableCell, { align: 'right' },
                                        "$",
                                        row.avg_stock)));
                            }
                        }))))),
            react_1.default.createElement(CompanyChart_js_1.default, { aggregateList: props.aggregateList, userSalary: props.userSalary, userAnnualBonus: props.userAnnualBonus, userStockOptions: props.userStockOptions, loading: props.loading }))));
}
exports.default = Total;
//# sourceMappingURL=Total_Company.js.map