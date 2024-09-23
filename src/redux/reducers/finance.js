import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
const financeDashboardReducer = createSlice({
  name: "counter",
  initialState: initialState,
  reducers: {
    increment: (state) => {
      return {};
    },
    decrement: (state) => {
      return {};
    },
  },
});

export const { increment, decrement } = financeDashboardReducer.actions;
export default financeDashboardReducer;
