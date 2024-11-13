// store/tableSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cells: Array.from({ length: 49 }, () => Array(11).fill(0)), // 49 rows, 38 columns initialized to 0
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    updateCell: (state, action) => {
      const { row, col, value } = action.payload;

      // Update the specific cell value
      state.cells[row][col] = value;

      const rejects = parseFloat(state.cells[37][c]); 
      const totalDefectsQty = parseFloat( state.cells[42][c]);
      const totalCheckGmts = parseFloat(state.cells[39][c]);
      const totalDefectiveGmts = parseFloat(state.cells[41][c]);
      const rejectsQty = parseFloat(state.cells[47][c]); 
      const totalPassGmts = parseFloat(state.cells[40][c]);
      const defectiveRectifiedQty =  parseFloat(state.cells[44][c])
      const DHU =  parseFloat(state.cells[43][c])
      

      // Recalculate the 10th column (index 9) for each row: sum of columns 1 to 9
      for (let r = 0; r < 49; r++) {
        state.cells[r][10] = state.cells[r]
          .slice(0, 10) // Get columns 1 to 9 (index 0 to 8)
          .reduce((sum, cellValue) => sum + parseFloat(cellValue) || 0, 0); // Sum the values
      }

      // Recalculate the 38th row (index 37): sum of columns 1 to 37 across all rows
      for (let c = 0; c < 11; c++) {
        state.cells[42][c] = state.cells
          .slice(0, 37) // All rows (0 to 48)
          .reduce((sum, rowValue) => sum + parseFloat(rowValue[c]) || 0, 0); // Sum the column values
      }

         // 1. Sum each column from row 40 and row 41, store result in row 39
         for (let c = 0; c < 11; c++) {
          state.cells[39][c] = [state.cells[40][c], state.cells[41][c]]
            .reduce((sum, cellValue) => sum + (parseFloat(cellValue) || 0), 0);
        }
         for (let c = 0; c < 11; c++) {
          state.cells[47][c] = state.cells[37][c]
        }
         for (let c = 0; c < 11; c++) {
          state.cells[45][c] = state.cells[41][c]
        }
          // 5. Subtract each column in row 44 from the same column in row 45
      for (let c = 0; c < 11; c++) {
        state.cells[45][c] = state.cells[45][c] - (state.cells[44][c] || 0);
      }
        // 6. Calculate percentage for each column in row 43 if state.cells[39][c] is not zero
        for (let c = 0; c < 11; c++) {
          if (state.cells[39][c]) {
            state.cells[43][c] = parseFloat(((state.cells[42][c] * 100) / state.cells[39][c]).toFixed(2));
          }
        }
    },
  },
});

export const { updateCell } = tableSlice.actions;
export default tableSlice.reducer;
