import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cells: Array.from({ length: 49 }, () => Array(11).fill(0)), 
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    updateCell: (state, action) => {
      const { row, col, value } = action.payload;

      // Update the specific cell value
      state.cells[row][col] = value;

      for (let c = 0; c < 11; c++) {
        const rejects = parseFloat(state.cells[37][c]);
        const totalDefectsQty = state.cells
          .slice(0, 37)
          .reduce((sum, row) => sum + parseFloat(row[c]) || 0, 0); 
        // const totalCheckGmts = parseFloat(state.cells[39][c]);
        const totalDefectiveGmts = parseFloat(state.cells[41][c]);
        // const rejectsQty = parseFloat(state.cells[47][c]);
        const totalPassGmts = parseFloat(state.cells[40][c]);
        const defectiveRectifiedQty = parseFloat(state.cells[44][c]);
        // const DHU = parseFloat(state.cells[43][c]);

        const totalCheckGmts = totalPassGmts + totalDefectiveGmts;
        const rejectsQty = rejects;
        const DefectiveBalanceQty = totalDefectiveGmts - (defectiveRectifiedQty || 0);

        state.cells[39][c] = totalCheckGmts; 
        state.cells[47][c] = rejectsQty; 
        state.cells[45][c] = totalDefectiveGmts; 

        if (defectiveRectifiedQty) {

            state.cells[45][c] = DefectiveBalanceQty; 
        }

        if (totalCheckGmts) {
          const DHU = parseFloat(((totalDefectsQty * 100) / totalCheckGmts).toFixed(2));
          
          state.cells[43][c] = DHU
        }
      }

      for (let r = 0; r < 49; r++) {
        const total = state.cells[r]
        .slice(0, 10)
        .reduce((sum, cellValue) => sum + parseFloat(cellValue) || 0, 0);

        state.cells[r][10] = total
      }

      for (let c = 0; c < 11; c++) {
        const totalDefectsQty = state.cells
        .slice(0, 37)
        .reduce((sum, row) => sum + parseFloat(row[c]) || 0, 0);

        state.cells[42][c] = totalDefectsQty
      }
    },
  },
});

export const { updateCell } = tableSlice.actions;
export default tableSlice.reducer;
