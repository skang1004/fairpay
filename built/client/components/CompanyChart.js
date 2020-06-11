"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var d3 = __importStar(require("d3"));
var CompanyChart = /** @class */ (function (_super) {
    __extends(CompanyChart, _super);
    function CompanyChart(props) {
        return _super.call(this, props) || this;
    }
    CompanyChart.prototype.componentDidMount = function () {
        var userArray = [
            this.props.userSalary,
            this.props.userAnnualBonus,
            this.props.userStockOptions,
        ];
        var result = Object.values(this.props.aggregateList[0]).slice(0, 3);
        var totalCompanyData = [];
        for (var i = 0; i < userArray.length; i++) {
            totalCompanyData.push(result[i]);
            totalCompanyData.push(userArray[i]);
        }
        // Use 3 instead of 6 labels
        var textArray = ['Salary', 'Annual Bonus', 'Stock Options'];
        var width = 1000;
        var height = 700;
        var svg = d3
            .select(this.refs.chart)
            .append('svg')
            .attr('width', width + 'px')
            .attr('height', height + 'px')
            .attr('class', 'bar');
        // creating initial bars, then transition handles the height and widths
        svg
            .selectAll('rect')
            .data(totalCompanyData)
            .enter()
            .append('rect')
            .attr('fill', function (d, i) {
            if (i % 2 === 0) {
                return '#1eab4e';
            }
            return '#0c5f7a';
        })
            .attr('class', 'sBar')
            .attr('x', function (d, i) {
            if (i % 2 === 0) {
                return 120 + i * 150;
            }
            return 20 + i * 150;
        })
            .attr('y', 300)
            .attr('width', 50)
            .attr('height', 0)
            .append('title')
            .text(function (d) { return d; });
        svg
            .selectAll('rect')
            .transition()
            .duration(800)
            .attr('y', function (d, i) {
            if (d > 1000) {
                return 400 - d / 1000;
            }
            return 400 - d / 90;
        })
            .attr('height', function (d, i) {
            if (d > 1000) {
                return d / 1000;
            }
            return d / 90;
        })
            .delay(function (d, i) {
            console.log(i);
            return i * 400;
        });
        var texts = svg.selectAll('text');
        // Salary labels
        texts
            .data(totalCompanyData)
            .enter()
            .append('text')
            .attr('font-size', 14)
            .attr('x', function (d, i) {
            if (i % 2 === 0) {
                return 120 + i * 150;
            }
            return 20 + i * 150;
        })
            .attr('y', function (d, i) {
            if (d > 1000) {
                return 380 - d / 1000;
            }
            return 380 - d / 90;
        })
            .text(function (d, i) {
            return '$' + totalCompanyData[i];
        });
        // X labels
        texts
            .data(textArray)
            .enter()
            .append('text')
            .style('font-size', 14)
            .attr('dy', '0em')
            .attr('x', function (d, i) {
            if (i === 2) {
                return 168 + i * 280;
            }
            return 146 + i * 278;
        })
            .attr('y', function (d, i) {
            return 450;
        })
            .text(function (d) { return d; });
    };
    CompanyChart.prototype.render = function () {
        var ranges = ['Average', 'User'];
        var barColors = ['average', 'user'];
        var legendBullets = ranges.map(function (elem, index) {
            return (react_1.default.createElement("p", null,
                react_1.default.createElement("span", { className: 'bullet legend-' + barColors[index] }),
                "\u00A0",
                ranges[index]));
        });
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { ref: "chart" },
                react_1.default.createElement("div", { className: "legend_box" }, legendBullets))));
    };
    return CompanyChart;
}(react_1.Component));
exports.default = CompanyChart;
//# sourceMappingURL=CompanyChart.js.map