import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./slices/auth"
import favoriteReducer from "./slices/favorite"
import cartReducer from "./slices/cart"

const store = configureStore({
    reducer:  {
        auth: authReducer,
        favorites: favoriteReducer,
        cart: cartReducer
    }
})

export default store