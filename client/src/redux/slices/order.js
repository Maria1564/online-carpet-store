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

//изменение статуса заказа
export const changeStatusOrder = createAsyncThunk("order/changeStatusOrder", async(params, {rejectWithValue, dispatch})=>{
    try{
        const {data} = await axios.patch("/orders", params)

        dispatch(changeStatus(data))


    }catch(err){
        console.log(err.message)

        return rejectWithValue("Не удалось обновить статус заказа")
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
    reducers:{
        changeStatus: (state, action)=>{
            state.listOrders = state.listOrders.map(order=>{
                if(action.payload.idorder === order.id){
                    console.log(order.id)
                    return {
                        ...order,
                        status: action.payload.status
                    }
                }

                return order
            })
        }   
    },
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

            .addCase(changeStatusOrder.pending, (state, action)=>{
                state.isError = null
            })
            .addCase(changeStatusOrder.fulfilled, (state, action)=>{

            })
            .addCase(changeStatusOrder.rejected, (state, action)=>{
                state.isError = action.payload
            })
    }
})

export const {changeStatus} =  orderSlice.actions
export default orderSlice.reducer