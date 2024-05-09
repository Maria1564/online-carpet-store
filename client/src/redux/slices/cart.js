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

//Добвление в корзину
export const addInCart= createAsyncThunk("cart/addInCart", async(params, {rejectWithValue, dispatch})=>{
    try{    
        const {data} = await axios.post("/cart", params)
        console.log(data)
        dispatch(addProductCart(data))
    }catch(err){
        console.log(err.message)
        return rejectWithValue("Не получилось добавить в корзину")
    }
})

//Увелечение товара на 1
export const plusOne = createAsyncThunk("cart/plusOne", async({idCart, quantity}, {rejectWithValue, dispatch})=>{
    try {
       
        const {data} = await axios.patch("/cart", {idCart, quantity:quantity+=1})
      
        dispatch(plusOrMinus(data)) 
        
    } catch (err) {
        console.log(err.message)
        return rejectWithValue("Не получилось увеличить/уменьшить товар на 1")
    }    
})  

//Уменьшение товара на 1
export const minusOne = createAsyncThunk("cart/minusOne", async({idCart, quantity}, {rejectWithValue, dispatch})=>{
    try {
       
        const {data} = await axios.patch("/cart", {idCart, quantity:quantity-=1})
      
        dispatch(plusOrMinus(data)) 
        
    } catch (err) {
        console.log(err.message)
        return rejectWithValue("Не получилось увеличить/уменьшить товар на 1")
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
        addProductCart: (state, action)=>{
            state.products.push(action.payload)
        },
        plusOrMinus: (state, action)=>{
            state.products = state.products.map((item)=>{
                if(item.id === action.payload.idCart){
                    return {
                        ...item,
                        quantity: action.payload.quantity
                    }
                
                }
                return  item
            })
            
        }
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

            .addCase(addInCart.pending, (state)=>{
                state.isError  = null
                state.status = "loading"
            })
            .addCase(addInCart.fulfilled, (state)=>{
                state.status = "loaded"
            })
            .addCase(addInCart.rejected, (state, action)=>{
                state.isError = action.payload
                state.status = "loaded"
            })

            .addCase(plusOne.pending, (state)=>{
                state.isError  = null
                state.status = "loading"
            })
            .addCase(plusOne.fulfilled, (state)=>{
                state.status = "loaded"
            })
            .addCase(plusOne.rejected, (state, action)=>{
                state.isError = action.payload
                state.status = "loaded"
            })


            
            .addCase(minusOne.pending, (state)=>{
                state.isError  = null
                state.status = "loading"
            })
            .addCase(minusOne.fulfilled, (state)=>{
                state.status = "loaded"
            })
            .addCase(minusOne.rejected, (state, action)=>{
                state.isError = action.payload
                state.status = "loaded"
            })
    }
})

export default cartSlice.reducer
export const {addProductCart, plusOrMinus} =  cartSlice.actions