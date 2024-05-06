import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";


//регистрация 
export const registerUser = createAsyncThunk("auth/registerUser", async(params,{rejectWithValue})=>{
    try {
        console.log("params >> ", params)
        const res = await axios.post("/auth/register", params)
     
        return res.data

    } catch (err) {
        return rejectWithValue("Не удалось зарегестрироватся. Попробуйте ввести другой email")
    }
})


//Аутентификация (вход)
export const loginUser = createAsyncThunk("auth/loginUser", async(params, {rejectWithValue})=>{
    try {
        
        const {data} = await axios.post("/auth/login", params)

        return data

    } catch (err) {
        return rejectWithValue("Неверный логин или пароль")
    }
})

//Авторизация
export const fetchData = createAsyncThunk("auth/fetchData", async( _, {rejectWithValue})=>{
    try {
        const {data} = await axios.get("/auth/me")

        return data

    } catch (err) {
        return rejectWithValue("Вы не авторизованы")
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
    reducers: {
        logout: (state)=>{
            state.isAuth = false
            state.infoUser =  null
            state.isError= null
        }
    },
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
            
            .addCase(loginUser.pending, (state)=>{
                state.infoUser = null
                state.isError = null
            })
            .addCase(loginUser.fulfilled,  (state, action)=>{
                state.infoUser = action.payload
                state.isAuth = true
            })
            .addCase(loginUser.rejected, (state, action)=>{
                state.infoUser = null
                state.isError = action.payload
            })

            .addCase(fetchData.pending, (state)=>{
                state.infoUser = null
                state.isError = null
            })
            .addCase(fetchData.fulfilled, (state, action)=>{
                state.infoUser = action.payload
                state.isAuth = true
            })
            .addCase(fetchData.rejected,  (state,action)=>{
                state.isAuth = false
            })
    }
})

export default authSlice.reducer
export const {logout} = authSlice.actions

