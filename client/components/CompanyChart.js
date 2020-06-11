import React, { Component, useRef } from 'react';
import * as d3 from 'd3';

class CompanyChart extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const userArray = [
      this.props.userSalary,
      this.props.userAnnualBonus,
      this.props.userStockOptions,
    ];
    let result = Object.values(this.props.aggregateList[0]).slice(0, 3);
    const totalCompanyData = [];
    for (let i = 0; i < userArray.length; i++) {
      totalCompanyData.push(result[i]);
      totalCompanyData.push(userArray[i]);
    }

    // Use 3 instead of 6 labels
    const textArray = ['Salary', 'Annual Bonus', 'Stock Options'];

    const width = 1000;
    const height = 700;

    const svg = d3
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
      .attr('fill', (d, i) => {
        if (i % 2 === 0) {
          return '#1eab4e';
        }
        return '#0c5f7a';
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
      .data(totalCompanyData)
      .enter()
      .append('text')
      .attr('font-size', 14)
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
      .text((d, i) => {
        return '$' + totalCompanyData[i];
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
    return (
      <React.Fragment>
        {/* <div ref="chart" width={500} height={500}>
          {" "}
        </div> */}
        <div ref="chart">
          {/* <h1>This is the bar chart</h1> */}
          <span className="legend_average"> </span>
          <span> Average</span>
          <span className="legend_user"> </span>
          <span> User</span>
        </div>
      </React.Fragment>
    );
  }
  // }
}

export default CompanyChart;
