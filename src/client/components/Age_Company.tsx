import React, { FunctionComponent } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';

import AgeChart from './AgeChart.js';

const Age: FunctionComponent = (props: any) => {
  return (
    <React.Fragment>
      <div hidden={props.value !== props.index}>
        <div className='data_display_div'>
          <TableContainer component={Paper}>
            <Table className='table_displays'>
              <TableHead className='TableHead'>
                <TableRow>
                  <TableCell>Age</TableCell>
                  <TableCell align='right'>People in Company</TableCell>
                  <TableCell align='right'>Average Salary</TableCell>
                  <TableCell align='right'>Average Annual Bonus</TableCell>
                  <TableCell align='right'>Average Stock Options</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.ageList.map((row, index) => {
                  if (index % 2 === 1) {
                    return (
                      <TableRow className='table-row' key={row.age}>
                        <TableCell>{row.age}</TableCell>
                        <TableCell align='right'>{row.count}</TableCell>
                        <TableCell align='right'>${row.avg_salary}</TableCell>
                        <TableCell align='right'>${row.avg_bonus}</TableCell>
                        <TableCell align='right'>${row.avg_stock}</TableCell>
                      </TableRow>
                    );
                  } else {
                    return (
                      <TableRow key={row.age}>
                        <TableCell>{row.age}</TableCell>
                        <TableCell align='right'>{row.count}</TableCell>
                        <TableCell align='right'>${row.avg_salary}</TableCell>
                        <TableCell align='right'>${row.avg_bonus}</TableCell>
                        <TableCell align='right'>${row.avg_stock}</TableCell>
                      </TableRow>
                    );
                  }
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <AgeChart ageList={props.ageList} />
      </div>
    </React.Fragment>
  );
};

export default Age;
