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
var AgeChart = /** @class */ (function (_super) {
    __extends(AgeChart, _super);
    function AgeChart(props) {
        return _super.call(this, props) || this;
        // this.createChartWrapper = this.createChartWrapper.bind(this);
        // const svgRef = useRef()
    }
    AgeChart.prototype.componentDidMount = function () {
        var totalAgeData = [];
        var chartAgeList = this.props.ageList;
        var barColors = ['orange', 'yellow', 'brown'];
        var categories = ['avg_salary', 'avg_bonus', 'avg_stock'];
        for (var i = 0; i < categories.length; i++) {
            for (var j = 0; j < chartAgeList.length; j++) {
                totalAgeData.push(chartAgeList[j][categories[i]]);
            }
        }
        var textArray = ['Salary', 'Annual Bonus', 'Stock Options'];
        var width = 1000;
        var height = 700;
        var svg = d3
            .select(this.refs.chart)
            .append('svg')
            .attr('width', width + 'px')
            .attr('height', height + 'px')
            .attr('class', 'bar');
        // making the table legend
        // svg
        //   .append("circle")
        //   .attr("cx", 370)
        //   .attr("cy", 20)
        //   .attr("r", 8)
        //   .style("fill", "navy");
        // svg
        //   .append("p")
        //   .attr("x", 390)
        //   .attr("y", 20)
        //   .text("Average")
        //   .style("font-size", 14)
        //   .attr("alignment-baseline", "middle");
        // svg
        //   .append("circle")
        //   .attr("cx", 370)
        //   .attr("cy", 50)
        //   .attr("r", 8)
        //   .style("fill", "green");
        // svg
        //   .append("p")
        //   .attr("x", 390)
        //   .attr("y", 50)
        //   .text("User")
        //   .style("font-size", 14)
        //   .attr("alignment-baseline", "middle");
        var numberOfRanges = chartAgeList.length;
        var barGap = 0;
        // creating initial bars, then transition handles the height and widths
        svg
            .selectAll('rect')
            .data(totalAgeData)
            .enter()
            .append('rect')
            .attr('fill', function (d, i) {
            return barColors[i % numberOfRanges];
        })
            .attr('class', 'sBar')
            .attr('x', function (d, i) {
            if (i % numberOfRanges === 0) {
                barGap += 175;
            }
            return barGap + i * 50;
        })
            .attr('y', 0)
            .attr('width', 50)
            .attr('height', 0)
            .append('title')
            .text(function (d) { return d; });
        svg
            .selectAll('rect')
            .data(totalAgeData)
            .enter()
            .append('text')
            .style('font-size', 14)
            .attr('x', function (d, i) { return 20 + i * 150; })
            .attr('y', function (d, i) {
            if (d > 1000) {
                return 400 - d / 1000 - 20;
            }
            return 400 - d / 90 - 20;
        })
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
        var salaryGap = 0;
        // Salary labels
        texts
            .data(totalAgeData)
            .enter()
            .append('text')
            .style('font-size', 12)
            .attr('x', function (d, i) {
            if (i % numberOfRanges === 0) {
                salaryGap += 175;
            }
            return salaryGap + i * 50;
        })
            .attr('y', function (d, i) {
            if (d > 1000) {
                return 380 - d / 1000;
            }
            return 380 - d / 90;
        })
            .text(function (d, i) {
            return '$' + totalAgeData[i];
        });
        // X labels
        texts
            .data(textArray)
            .enter()
            .append('text')
            .style('font-size', 12)
            .attr('dy', '0em')
            .attr('x', function (d, i) { return 185 + i * 275; })
            .attr('y', function (d, i) {
            return 435;
        })
            .text(function (d) { return d; });
    };
    AgeChart.prototype.render = function () {
        var ranges = ['18-35', '36-50', '51+'];
        var barColors = ['orange', 'yellow', 'brown'];
        var legendBullets = ranges.map(function (elem, index) {
            return (react_1.default.createElement("p", null,
                react_1.default.createElement("span", { className: 'bullet legend-' + barColors[index] }),
                "\u00A0",
                ranges[index]));
        });
        console.log(legendBullets);
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { ref: "chart" },
                react_1.default.createElement("div", { className: "legend_box" }, legendBullets))));
    };
    return AgeChart;
}(react_1.Component));
exports.default = AgeChart;
//# sourceMappingURL=AgeChart.js.map