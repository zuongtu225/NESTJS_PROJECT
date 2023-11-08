import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../action";
const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    orderDetail: {},
    historyOrders: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actions.getOrderApi.pending, (state: any, action) => {
      state.orders = action.payload;
    });
    builder.addCase(actions.getOrderApi.fulfilled, (state: any, action) => {
      state.orders = action.payload;
    });
    builder.addCase(
      actions.getHistoryOrders.fulfilled,
      (state: any, action) => {
        state.historyOrders = action.payload;
      }
    );
    builder.addCase(actions.getDetailOrder.fulfilled, (state: any, action) => {
      state.orderDetail = action.payload;
    });
    builder.addCase(actions.getOrderApi.rejected, (state: any, action) => {
      state.orders = action.payload;
    });
  },
});

export default orderSlice.reducer;
