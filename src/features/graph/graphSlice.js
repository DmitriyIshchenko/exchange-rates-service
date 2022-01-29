import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchHistorical } from "./graphAPI";
const initialState = {
    historical: [],
    period: "month",
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
        setPeriod: (state, action) => {
            state.period = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchHistoricalAsync.fulfilled, (state, action) => {
            state.statusHistorical = "succeeded";
            state.historical = Object.entries(action.payload.rates).map(([date, rate]) =>
                ({ date: new Date(date).getTime(), rate: Object.values(rate)[0] }))
        })
    }
})
export const { setPeriod } = graphSlice.actions;
export default graphSlice.reducer;