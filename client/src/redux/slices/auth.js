import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const registerUser = createAsyncThunk("auth/registerUser", async(params,{rejectWithValue})=>{
    try {
        console.log("params >> ", params)
        const res = await axios.post("/auth/register", params)
     
        return res.data

    } catch (err) {
        console.log(err.message)
        return rejectWithValue("Не удалось зарегестрироватся. Попробуйте ввести другой email")
    }
})



const initialState = {
    infoUser: null,
    isAuth:  false, //авторизован ли поьзователь
    isError: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        console.log("builder>> ",builder)
        builder
            .addCase(registerUser.pending, (state)=>{
                state.infoUser = null
                state.isError = null
            })
            .addCase(registerUser.fulfilled, (state, action)=>{
                state.infoUser = action.payload
            })
            .addCase(registerUser.rejected, (state, action)=>{
                state.infoUser = null
                state.isError = action.payload
                
            })
          
        
    }
})

export default authSlice.reducer

