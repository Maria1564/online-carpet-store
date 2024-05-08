import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

//Получение товаров
export const getAllCart = createAsyncThunk("cart/getAllCart", async(_, {rejectWithValue, dispatch})=>{
    try {
        const {data} = await axios.get("/cart")
        
        return data
    } catch (err) {
        console.log(err.message)
        return rejectWithValue("Не получилось досать данные корзины")
    }
})

const initialState = {
    products: [],
    status: "loading",
    isError: null
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

    },
    extraReducers: (builder)=>{
        builder
            .addCase(getAllCart.pending, (state)=>{
                state.isError  = null
                state.products = []
                state.status = "loading"
            })
            .addCase(getAllCart.fulfilled, (state, action)=>{
                state.products = action.payload
                state.status = "loaded"

            })
            .addCase(getAllCart.rejected, (state, action)=>{
                state.isError = action.payload
                state.status = "loaded"
            })
    }
})

export default cartSlice.reducer