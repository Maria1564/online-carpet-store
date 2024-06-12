import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

//получение текущего заказа
export const getCurrentOrder = createAsyncThunk( "order/fetchCurrentOrder", async(params, {rejectWithValue})=>{
    try {
        const {data} = await axios.post("/orders", params)

        return data
    } catch (err) {
        return rejectWithValue("Не удалось создать заказ")
    }
})

//получение всех заказов
export const getAllOrders = createAsyncThunk("order/getAllOrders", async(params, {rejectWithValue})=>{
    try{
        const {data} = await axios.get("/orders")

        return data
    }catch(err){
        return rejectWithValue("Не удалось получить список заказов")
    }
})

const initialState = {
    listOrders: null,
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

            .addCase(getAllOrders.pending, (state, action)=>{
                state.isError = null
                state.listOrders = null
            })
            .addCase(getAllOrders.fulfilled, (state, action)=>{
                state.listOrders = action.payload
            })
            .addCase(getAllOrders.rejected  , (state, action)=> {
                state.isError = action.payload
            })
    }
})

export default orderSlice.reducer