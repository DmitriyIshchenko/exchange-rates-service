import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchSymbols, fetchLatestRates, convert } from "./exhangerAPI";
const initialState = {
    base: "USD",
    target: "USD",
    statusSymbols: "idle",
    symbols: {},
    statusRates: "idle",
    rates: {}
}

export const fetchRatesAsync = createAsyncThunk(
    "exchanger/fetchRates",
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

export const exchangerSlice = createSlice({
    name: "exchanger",
    initialState,
    reducers: {
        setTarget: (state, action) => {
            state.target = action.payload;
        },
        setBase: (state, action) => {
            state.base = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSymbolsAsync.fulfilled, (state, action) => {
            state.statusSymbols = "succeeded";
            state.symbols = action.payload;
        });
        builder.addCase(fetchRatesAsync.fulfilled, (state, action) => {
            state.statusRates = "succeeded";
            state.rates = action.payload.rates;
        })
    }
})

export const { setBase, setTarget } = exchangerSlice.actions;

export default exchangerSlice.reducer;
