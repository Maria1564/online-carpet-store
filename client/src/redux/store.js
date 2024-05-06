import {configureStore} from "@reduxjs/toolkit"
import authReduser from "./slices/auth"
import favoriteReducer from "./slices/favorite"

const store = configureStore({
    reducer:  {
        auth: authReduser,
        favorites: favoriteReducer,
    }
})

export default store