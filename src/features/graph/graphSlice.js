import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchHistorical } from "./graphAPI";
const initialState = {
    historical: {}
}

export const fetchHistoricalAsync = createAsyncThunk(
    "graph/fetchHistorical",
    async (data) => {
        const startDate = data[0];
        const endDate = data[1];
        const base = data[2];
        const target = data[3];
        const response = await fetchHistorical(startDate, endDate, base, target);
        return response;
    }
)

export const graphSlice = createSlice({
    name: "graph",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchHistoricalAsync.fulfilled, (state, action) => {
            state.historical = action.payload.rates;
        })
    }
})

export default graphSlice.reducer;