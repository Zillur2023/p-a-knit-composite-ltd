'use client'
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCell } from '@/redux/features/table/tableSlice';
import { RootState } from '@/redux/store';
import { defectsName, reportTime } from '@/constant';
// import { updateCell } from '../store/tableSlice'; 


const TablePage = () => {
  const dispatch = useDispatch();
  const cells = useSelector((state:RootState) => state.table.cells);

  // Handle cell changes
  const handleChange = (row, col, event) => {
    const value = event.target.value ? parseInt(event.target.value, 10) : 0;
    dispatch(updateCell({ row, col, value }));
  };




  return (
    <table className="table-auto w-full pl-1 ">
    <thead>
      <tr>
        <th className=" whitespace-nowrap py-2 w-auto border-2">Name</th>
        {reportTime.map((time) => (
          <th key={time} className=" whitespace-nowrap py-2 w-auto border-2">{time}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {cells.map((defect, rowIndex) => (
        <tr key={rowIndex}>
          <td className=" border-2 w-auto text-center whitespace-nowrap">
            {defectsName[rowIndex]}
          </td>
          {Object.keys(defect).map((key, colIndex) => (
            <td key={colIndex} className=" border-2 ">
              <input
                className="w-full text-center rounded "
                type="number"
                value={defect[colIndex]}
                onChange={(e) =>
                  handleChange(rowIndex, colIndex, e)
                }
              />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
  );
};

export default TablePage;
