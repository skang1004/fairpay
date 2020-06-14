import React, { Component, useRef } from 'react';
import * as d3 from 'd3';

class RaceChart extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const color = ['#1eab4e', '#0c5f7a', '#a5e350', '#1eab4e'];
    const totalRaceData = [];
    const numberOfRaces = this.props.raceList.length;
    // console.log('this is the raceList in chart     ', this.props);
    for (let i = 0; i < numberOfRaces; i++) {
      totalRaceData.push(this.props.raceList[i].avg_salary);
    }
    for (let i = 0; i < numberOfRaces; i++) {
      totalRaceData.push(this.props.raceList[i].avg_bonus);
    }
    for (let i = 0; i < numberOfRaces; i++) {
      totalRaceData.push(this.props.raceList[i].avg_stock);
    }

    const textArray = ['Salary', 'Annual Bonus', 'Stock Options'];

    const width = 1200;
    const height = 700;

    const svg = d3
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
    let space = 0;
    svg
      .selectAll('rect')
      .data(totalRaceData)
      .enter()
      .append('rect')
      .attr('fill', (d, i) => {
        return color[i % numberOfRaces];
      })
      .attr('class', 'sBar')
      .attr('x', (d, i) => {
        if (i % numberOfRaces === 0) {
          space += 200;
        }

        return space + i * 50;
      })
      .attr('y', 300)
      .attr('width', 50)
      .attr('height', 0)
      .append('title')
      .text((d) => d);

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
      .attr('y', (d, i) => {
        if (d > 1000) {
          return 400 - d / 1000;
        }
        return 400 - d / 90;
      })
      .attr('height', (d, i) => {
        if (d > 1000) {
          return d / 1000;
        }
        return d / 90;
      })
      .delay(function (d, i) {
        console.log(i);
        return i * 400;
      });

    let texts = svg.selectAll('text');

    // // Salary labels
    let labelSpace = 0;

    texts
      .data(totalRaceData)
      .enter()
      .append('text')
      .attr('x', (d, i) => {
        if (i % numberOfRaces === 0) {
          labelSpace += 200;
        }
        return labelSpace + i * 50;
      })
      .attr('y', (d, i) => {
        if (d > 1000) {
          return 380 - d / 1000;
        }
        return 380 - d / 90;
      })
      .attr('font-size', 14)
      .text((d, i) => {
        return '$' + totalRaceData[i];
      });
    // X labels
    texts
      .data(textArray)
      .enter()
      .append('text')
      .style('font-size', 14)
      .attr('dy', '0em')
      .attr('x', (d, i) => {
        return 250 + i * 345;
      })
      .attr('y', (d, i) => {
        return 450;
      })
      .text((d) => d);
  }

  render() {
    const ranges = ['Asian', 'Black', 'Hispanic', 'White'];
    const barColors = ['asian', 'black', 'hispanic', 'white'];
    const legendBullets = ranges.map((elem, index) => {
      return (
        <p>
          <span className={'bullet legend-' + barColors[index]}></span>&nbsp;
          {ranges[index]}
        </p>
      );
    });
    return (
      <React.Fragment>
        <div ref="chart">
          <div className="legend_box">{legendBullets}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default RaceChart;
