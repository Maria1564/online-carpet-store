import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./slices/auth"
import favoriteReducer from "./slices/favorite"
import cartReducer from "./slices/cart"
import orderReducer from "./slices/order"

const store = configureStore({
    reducer:  {
        auth: authReducer,
        favorites: favoriteReducer,
        cart: cartReducer,
        order: orderReducer
    }
})

export default store