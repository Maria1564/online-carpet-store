import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const getCurrentOrder = createAsyncThunk( "order/fetCurrentOrder", async(params, {rejectWithValue})=>{
    try {
        const {data} = await axios.post("/orders", params)

        return data
    } catch (err) {
        return rejectWithValue("Не удалось создать заказ")
    }
})

const initialState = {
    currentOrder: null,
    isError: null
}

const orderSlice = createSlice({
    name: "order",
    initialState,
    extraReducers: (builder) => {
        builder 
            .addCase(getCurrentOrder.pending, (state, action)=>{
                state.currentOrder = null
                state.isError =  null
            })
            .addCase(getCurrentOrder.fulfilled, (state, action)=>{
                state.currentOrder = action.payload
            })
            .addCase(getCurrentOrder.rejected, (state, action)=>{
                state.isError = action.payload
            })
    }
})

export default orderSlice.reducer