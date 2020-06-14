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
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var d3 = __importStar(require("d3"));
var RaceChart = /** @class */ (function (_super) {
    __extends(RaceChart, _super);
    function RaceChart(props) {
        return _super.call(this, props) || this;
    }
    RaceChart.prototype.componentDidMount = function () {
        var color = ['#1eab4e', '#0c5f7a', '#a5e350', '#1eab4e'];
        var totalRaceData = [];
        var numberOfRaces = this.props.raceList.length;
        // console.log('this is the raceList in chart     ', this.props);
        for (var i = 0; i < numberOfRaces; i++) {
            totalRaceData.push(this.props.raceList[i].avg_salary);
        }
        for (var i = 0; i < numberOfRaces; i++) {
            totalRaceData.push(this.props.raceList[i].avg_bonus);
        }
        for (var i = 0; i < numberOfRaces; i++) {
            totalRaceData.push(this.props.raceList[i].avg_stock);
        }
        var textArray = ['Salary', 'Annual Bonus', 'Stock Options'];
        var width = 1200;
        var height = 700;
        var svg = d3
            .select(this.refs.chart)
            .append('svg')
            .attr('width', width + 'px')
            .attr('height', height + 'px')
            .attr('class', 'bar');
        // // svg
        // //   .append("p")
        // //   .attr("x", 390)
        // //   .attr("y", 20)
        // //   .text("Average")
        // //   .style("font-size", 14)
        // //   .attr("alignment-baseline", "middle");
        // // svg
        // //   .append("p")
        // //   .attr("x", 390)
        // //   .attr("y", 50)
        // //   .text("User")
        // //   .style("font-size", 14)
        // //   .attr("alignment-baseline", "middle");
        // const color = ['red', 'blue', 'green', 'yelow'];
        // creating initial bars, then transition handles the height and widths
        var space = 0;
        svg
            .selectAll('rect')
            .data(totalRaceData)
            .enter()
            .append('rect')
            .attr('fill', function (d, i) {
            return color[i % numberOfRaces];
        })
            .attr('class', 'sBar')
            .attr('x', function (d, i) {
            if (i % numberOfRaces === 0) {
                space += 200;
            }
            return space + i * 50;
        })
            .attr('y', 300)
            .attr('width', 50)
            .attr('height', 0)
            .append('title')
            .text(function (d) { return d; });
        // svg
        //   .selectAll('rect')
        //   .data(totalRaceData)
        //   .enter()
        //   .append('text')
        //   .style('font-size', 14)
        //   .attr('x', (d, i) => 20 + i * 150)
        //   .attr('y', (d, i) => {
        //     if (d > 1000) {
        //       return 400 - d / 1000 - 20;
        //     }
        //     return 400 - d / 90 - 20;
        //   })
        //   .text((d) => d);
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
        // // Salary labels
        var labelSpace = 0;
        texts
            .data(totalRaceData)
            .enter()
            .append('text')
            .attr('x', function (d, i) {
            if (i % numberOfRaces === 0) {
                labelSpace += 200;
            }
            return labelSpace + i * 50;
        })
            .attr('y', function (d, i) {
            if (d > 1000) {
                return 380 - d / 1000;
            }
            return 380 - d / 90;
        })
            .attr('font-size', 14)
            .text(function (d, i) {
            return '$' + totalRaceData[i];
        });
        // X labels
        texts
            .data(textArray)
            .enter()
            .append('text')
            .style('font-size', 14)
            .attr('dy', '0em')
            .attr('x', function (d, i) {
            return 250 + i * 345;
        })
            .attr('y', function (d, i) {
            return 450;
        })
            .text(function (d) { return d; });
    };
    RaceChart.prototype.render = function () {
        var ranges = ['Asian', 'Black', 'Hispanic', 'White'];
        var barColors = ['asian', 'black', 'hispanic', 'white'];
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
    return RaceChart;
}(react_1.Component));
exports.default = RaceChart;
//# sourceMappingURL=RaceChart.js.map