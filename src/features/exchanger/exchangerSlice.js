import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchSymbols, fetchLatestRates, convert } from "./exhangerAPI";
const initialState = {
    input: "",
    exchangeFrom: "",
    exchangeTo: "",
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
        const response = await fetchSymbols();
        return response;
    }
)

export const convertAsync = createAsyncThunk(
    "exchanger/convert",
    async (str) => {
        const sentence = str.split(" ");
        const amount = sentence[0];
        const from = sentence[1].toUpperCase();
        const to = sentence[3].toUpperCase();
        const response = await convert(from, to, amount);
        return response;
    }
)

export const exchangerSlice = createSlice({
    name: "exchanger",
    initialState,
    reducers: {
        setExchangeFrom: (state, action) => {
            state.exchangeFrom = action.payload;
            state.exchangeTo = (Math.trunc(+action.payload * state.rates[state.target] * 1000) / 1000) || "";
        },
        setExchangeTo: (state, action) => {
            state.exchangeFrom = (Math.trunc(+action.payload / state.rates[state.target] * 1000) / 1000) || "";
            state.exchangeTo = action.payload;
        },
        setTarget: (state, action) => {
            state.target = action.payload;
            state.exchangeTo = (Math.trunc(state.exchangeFrom * state.rates[state.target] * 1000) / 1000) || "";
        },
        setInput: (state, action) => {
            state.input = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSymbolsAsync.fulfilled, (state, action) => {
            state.statusSymbols = "succeeded";
            state.symbols = action.payload;
        });
        builder.addCase(setBaseAsync.fulfilled, (state, action) => {
            state.statusRates = "succeeded";
            state.rates = action.payload.rates;
            state.base = action.payload.base;
            state.exchangeTo = (Math.trunc(state.exchangeFrom * state.rates[state.target] * 1000) / 1000) || "";
        })
        builder.addCase(convertAsync.fulfilled, (state, action) => {
            state.base = action.payload.query.from;
            state.target = action.payload.query.to;
            state.exchangeFrom = action.payload.query.amount;
            state.exchangeTo = action.payload.result;
        })
    }
})


export const selectExchangeFrom = (state) => state.exchanger.exchangeFrom;
export const selectExchangeTo = (state) => state.exchanger.exchangeTo;
export const { setExchangeFrom, setExchangeTo, setTarget, setInput } = exchangerSlice.actions;
export default exchangerSlice.reducer;
