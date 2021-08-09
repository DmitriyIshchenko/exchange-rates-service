import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchTime, fetchSymbols } from "./exhangerAPI";
require('dotenv').config()
const initialState = {
    exchangeFrom: "",
    exchangeTo: "",
    rate: 75,
    base: "RUB",
    statusSymbols: "idle",
    symbols: {}
}


export const setBaseAsync = createAsyncThunk();

export const fetchSymbolsAsync = createAsyncThunk(
    "exchanger/fetchSymbols",
    async () => {
        const response =  await fetchSymbols();
        return response;
    }
)

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
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSymbolsAsync.fulfilled, (state,action)=>{
            state.statusSymbols = "succeeded";
            state.symbols = action.payload;
        })
    }
})


export const selectExchangeFrom = (state) => state.exchanger.exchangeFrom;
export const selectExchangeTo = (state) => state.exchanger.exchangeTo;
export const { setExchangeFrom, setExchangeTo } = exchangerSlice.actions;
export default exchangerSlice.reducer;
