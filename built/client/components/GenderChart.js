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
var GenderChart = /** @class */ (function (_super) {
    __extends(GenderChart, _super);
    function GenderChart(props) {
        return _super.call(this, props) || this;
    }
    GenderChart.prototype.componentDidMount = function () {
        // Color of the bars
        var color = ['#1eab4e', '#0c5f7a'];
        var totalGenderData = [];
        var numberOfGenders = this.props.genderList.length;
        // Create the array to be iterated through to populate the chart
        for (var i = 0; i < numberOfGenders; i++) {
            totalGenderData.push(this.props.genderList[i].avg_salary);
        }
        for (var i = 0; i < numberOfGenders; i++) {
            totalGenderData.push(this.props.genderList[i].avg_bonus);
        }
        for (var i = 0; i < numberOfGenders; i++) {
            totalGenderData.push(this.props.genderList[i].avg_stock);
        }
        var textArray = ['Salary', 'Annual Bonus', 'Stock Options'];
        // Set dimensions of the chart
        var width = 1000;
        var height = 700;
        // Grab the chart reference to be rendered to
        var svg = d3
            .select(this.refs.chart)
            .append('svg')
            .attr('width', width + 'px')
            .attr('height', height + 'px')
            .attr('class', 'bar');
        // Fill bars with color and height (initially 0, transitioning higher)
        svg
            .selectAll('rect')
            .data(totalGenderData)
            .enter()
            .append('rect')
            .attr('fill', function (d, i) {
            return color[i % numberOfGenders];
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
        // Transition animation
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
            .data(totalGenderData)
            .enter()
            .append('text')
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
            .attr('font-size', 14)
            .text(function (d, i) {
            return '$' + totalGenderData[i];
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
    GenderChart.prototype.render = function () {
        var ranges = ['Female', 'Male'];
        var barColors = ['male', 'female'];
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
    return GenderChart;
}(react_1.Component));
exports.default = GenderChart;
//# sourceMappingURL=GenderChart.js.map