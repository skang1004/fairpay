import React, { Component, useRef } from 'react';
import * as d3 from 'd3';

class GenderChart extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // Color of the bars
    const color = ['#1eab4e', '#0c5f7a'];
    const totalGenderData = [];
    const numberOfGenders = this.props.genderList.length;
    // Create the array to be iterated through to populate the chart
    for (let i = 0; i < numberOfGenders; i++) {
      totalGenderData.push(this.props.genderList[i].avg_salary);
    }
    for (let i = 0; i < numberOfGenders; i++) {
      totalGenderData.push(this.props.genderList[i].avg_bonus);
    }
    for (let i = 0; i < numberOfGenders; i++) {
      totalGenderData.push(this.props.genderList[i].avg_stock);
    }

    const textArray = ['Salary', 'Annual Bonus', 'Stock Options'];

    // Set dimensions of the chart
    const width = 1000;
    const height = 700;

    // Grab the chart reference to be rendered to
    const svg = d3
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
      .attr('fill', (d, i) => {
        return color[i % numberOfGenders];
      })
      .attr('class', 'sBar')
      .attr('x', (d, i) => {
        if (i % 2 === 0) {
          return 120 + i * 150;
        }
        return 20 + i * 150;
      })
      .attr('y', 300)
      .attr('width', 50)
      .attr('height', 0)
      .append('title')
      .text((d) => d);

    // Transition animation
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

    // Salary labels
    texts
      .data(totalGenderData)
      .enter()
      .append('text')
      .attr('x', (d, i) => {
        if (i % 2 === 0) {
          return 120 + i * 150;
        }
        return 20 + i * 150;
      })
      .attr('y', (d, i) => {
        if (d > 1000) {
          return 380 - d / 1000;
        }
        return 380 - d / 90;
      })
      .attr('font-size', 14)
      .text((d, i) => {
        return '$' + totalGenderData[i];
      });

    // X labels
    texts
      .data(textArray)
      .enter()
      .append('text')
      .style('font-size', 14)
      .attr('dy', '0em')
      .attr('x', (d, i) => {
        if (i === 2) {
          return 168 + i * 280;
        }
        return 146 + i * 278;
      })
      .attr('y', (d, i) => {
        return 450;
      })
      .text((d) => d);
  }

  render() {
    const ranges = ['Female', 'Male'];
    const barColors = ['male', 'female'];
    const legendBullets = ranges.map((elem, index) => {
      return (
        <p>
          <span className={'bullet legend-' + barColors[index]}></span>
          &nbsp;
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

export default GenderChart;
