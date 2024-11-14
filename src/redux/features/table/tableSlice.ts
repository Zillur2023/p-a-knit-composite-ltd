import { createSlice } from "@reduxjs/toolkit";

const TOTAL_ROWS = 49;
const TOTAL_COLS = 11;

// Define important row indices as constants for clarity
const REJECTS_ROW = 37;
const TOTAL_CHECK_GMTS_ROW = 39;
const TOTAL_PASS_GMTS_ROW = 40;
const TOTAL_DEFECTIVE_GMTS_ROW = 41;
const TOTAL_DEFECTS_QTY_ROW = 42;
const DHU_ROW = 43;
const DEFECTIVE_RECTIFIED_QTY_ROW = 44;
const DEFECTIVE_BALANCE_QTY_ROW = 45;
const REJECTS_QTY_ROW = 47;

const initialState = {
  cells: Array.from({ length: TOTAL_ROWS }, () => Array(TOTAL_COLS).fill(0)),
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    updateCell: (state, action) => {
      const { row, col, value } = action.payload;
      state.cells[row][col] = parseFloat(value) || 0; // Update the specific cell

      // Update columns based on new values
      for (let c = 0; c < TOTAL_COLS; c++) {
        const rejects = parseFloat(state.cells[REJECTS_ROW][c]) || 0;
        const totalDefectsQty = state.cells
          .slice(0, 37)
          .reduce((sum, row) => sum + (parseFloat(row[c]) || 0), 0);

        const totalDefectiveGmts =
          parseFloat(state.cells[TOTAL_DEFECTIVE_GMTS_ROW][c]) || 0;
        const totalPassGmts =
          parseFloat(state.cells[TOTAL_PASS_GMTS_ROW][c]) || 0;
        const defectiveRectifiedQty =
          parseFloat(state.cells[DEFECTIVE_RECTIFIED_QTY_ROW][c]) || 0;

        // Calculate dependent values
        const totalCheckGmts = totalPassGmts + totalDefectiveGmts;
        const rejectsQty = rejects;
        const defectiveBalanceQty = totalDefectiveGmts - defectiveRectifiedQty;

        state.cells[TOTAL_CHECK_GMTS_ROW][c] = totalCheckGmts;
        state.cells[REJECTS_QTY_ROW][c] = rejectsQty;
        state.cells[DEFECTIVE_BALANCE_QTY_ROW][c] = defectiveRectifiedQty
          ? defectiveBalanceQty
          : totalDefectiveGmts;

        if (totalCheckGmts) {
          const DHU = parseFloat(
            ((totalDefectsQty * 100) / totalCheckGmts).toFixed(2)
          );
          state.cells[DHU_ROW][c] = DHU;
        }
      }

      // Calculate row totals
      for (let r = 0; r < TOTAL_ROWS; r++) {
        const total = state.cells[r]
          .slice(0, TOTAL_COLS - 1)
          .reduce((sum, cellValue) => sum + (parseFloat(cellValue) || 0), 0);

        state.cells[r][TOTAL_COLS - 1] = total;
      }

      // Calculate total defects by column
      for (let c = 0; c < TOTAL_COLS; c++) {
        const totalDefectsQty = state.cells
          .slice(0, 37)
          .reduce((sum, row) => sum + (parseFloat(row[c]) || 0), 0);

        state.cells[TOTAL_DEFECTS_QTY_ROW][c] = totalDefectsQty;
      }
    },
  },
});

export const { updateCell } = tableSlice.actions;
export default tableSlice.reducer;
