import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchHistorical } from "./graphAPI";
const initialState = {
    historical: {},
    statusHistorical: "idle"
}

export const fetchHistoricalAsync = createAsyncThunk(
    "graph/fetchHistorical",
    async (data) => {
        const response = await fetchHistorical(data);
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
            state.statusHistorical = "succeeded";
            state.historical = action.payload.rates;
        })
    }
})

export default graphSlice.reducer;