import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const getFavorites = createAsyncThunk("favorites/getFavorites", async(_, {rejectWithValue})=>{
    try {
        const {data} = await axios.get("/favorites")

        return data

    } catch (err) {
        return rejectWithValue("Не получилось показать избранные товары")
    }
}) 

export const addFavorite =createAsyncThunk("favorites/addFavorite", async(params, {rejectWithValue, dispatch})=>{
    try {   
        console.log(params)
        const {data} = await axios.post("/favorites", params)

        dispatch(addInFavorites(data))

    } catch (err) {
        console.log(err.message)
        return rejectWithValue("Не получилось добавить в избранное")
    }
})

export const removeFavorite = createAsyncThunk("favorites/removeFavorite", async(params, {rejectWithValue, dispatch})=>{
    try {
       const {id} = params
        const {data} = await axios.delete(`/favorites/${id}`)
    
        dispatch(removeInFavorites(data))

    } catch (err) {
        return rejectWithValue("Не получилось удалить из избранного")
    }
})


const initialState = {
    favoriteProducts: [],
    isError: null
}

const favoriteSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addInFavorites: (state, action)=>{
            state.favoriteProducts.push(action.payload)
        },
        removeInFavorites: (state, action)=>{
            state.favoriteProducts = state.favoriteProducts.filter(item=> item.id !== action.payload.id)
        }
    },
    extraReducers: (builder)=>{
        builder
            .addCase(getFavorites.pending, (state)=>{
                state.isError = null
                state.favoriteProducts = []
            })
            .addCase(getFavorites.fulfilled, (state, action)=>{
                state.favoriteProducts = action.payload
            })
            .addCase(getFavorites.rejected, (state, action)=>{
                state.favoriteProducts = []
                state.isError = action.payload
            })

            .addCase(removeFavorite.pending, (state)=>{
                state.isError = null
            })
            .addCase(removeFavorite.rejected, (state, action)=>{
                state.isError =   action.payload  
            })

            .addCase(addFavorite.pending, (state)=>{
                state.isError = null
            })
            .addCase(addFavorite.rejected, (state, action)=>{
                state.isError =   action.payload  
            })
    }
})

export default favoriteSlice.reducer
export const {addInFavorites, removeInFavorites} = favoriteSlice.actions