'use client'
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCell } from '@/redux/features/table/tableSlice';
import { RootState } from '@/redux/store';
import { defectsName, reportTime } from '@/constant';

const TablePage = () => {
  const dispatch = useDispatch();
  const cells = useSelector((state:RootState) => state.table.cells);

  // Handle cell changes
  const handleChange = (row: number, col: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value 
    dispatch(updateCell({ row, col, value }));
  };




  return (
    <table className="table-auto w-full px-1 ">
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
          <td className=" border-2 w-auto px-1 whitespace-nowrap">
            {defectsName[rowIndex]}
          </td>
          {Object.keys(defect).map((cellValue, colIndex) => (
            <td
            key={colIndex}
            className="border-2 text-center"
            style={
              colIndex === defect.length - 1
                ? { whiteSpace: 'nowrap' }
                : {}
            }
          >
              <input
                className=" text-center rounded px-1 "
                type="number"
                value={defect[colIndex] === 0 ? "" : defect[colIndex]}
                onChange={(e) =>
                  handleChange(rowIndex, colIndex, e)
                }
                style={
                  colIndex === defect.length - 1
                    ? {
                        minWidth: '100%', 
                        // width: '100%', 
                        // width: `${Math.max(defect[colIndex].toString().length,2)}ch`, 
                        // paddingLeft: '0.5rem', 
                        // paddingRight: '0.5rem'
                      }
                    : { width: '100%' }
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
