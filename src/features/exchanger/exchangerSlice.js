import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import { fetchSymbols, fetchLatestRates } from "./exhangerAPI";
require('dotenv').config()
const initialState = {
    exchangeFrom: "",
    exchangeTo: "",
    rate: 75,
    base: "USD",
    target: "RUB",
    statusSymbols: "idle",
    symbols: {},
    statusRates: "idle",
    rates: {}
    
}


export const setBaseAsync = createAsyncThunk(
    "exchanger/setBase",
    async (base) => {
        const response = await fetchLatestRates(base);
        return response;
    }
);

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
            state.exchangeTo = +action.payload * 1;
        },
        setExchangeTo: (state, action) => {
            
            state.exchangeFrom = +action.payload / 1;
            state.exchangeTo = action.payload;
        },
        setTarget: (state,action)=>{
            state.target = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSymbolsAsync.fulfilled, (state,action)=>{
            state.statusSymbols = "succeeded";
            state.symbols = action.payload;
        });
        builder.addCase(setBaseAsync.fulfilled ,(state,action)=>{
            state.statusRates = "succeeded";
            state.rates = action.payload.rates;
            state.base = action.payload.base;
        })
    }
})


export const selectExchangeFrom = (state) => state.exchanger.exchangeFrom;
export const selectExchangeTo = (state) => state.exchanger.exchangeTo;
export const { setExchangeFrom, setExchangeTo, setTarget} = exchangerSlice.actions;
export default exchangerSlice.reducer;
