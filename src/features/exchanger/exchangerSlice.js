import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    exchangeFrom: "",
    exchangeTo: "",
    rate: 75
}

export const exchangerSlice = createSlice({
    name: "exchanger",
    initialState,
    reducers: {
        setExchangeFrom: (state, action) => {
            state.exchangeFrom = action.payload;
            state.exchangeTo = +action.payload * state.rate;
        },
        setExchangeTo: (state, action) => {
            state.exchangeFrom = +action.payload / state.rate;
            state.exchangeTo = action.payload;
        }
    }
})


export const selectExchangeFrom = (state) => state.exchanger.exchangeFrom;
export const selectExchangeTo = (state) => state.exchanger.exchangeTo;
export const { setExchangeFrom, setExchangeTo } = exchangerSlice.actions;
export default exchangerSlice.reducer;
