import AboutUs from "./pages/AboutUs/AboutUs";
import Home from "./pages/Home/Home";
// import Portfolio from "./pages/Portfolio/Portfolio";
// import Reviews from "./pages/Reviews/Reviews";
import Footer from "./layouts/Footer/Footer";
import Navbar from "./layouts/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Authorization/Register/Register";
import Login from "./pages/Authorization/Login/Login";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchData } from "./redux/slices/auth";
import Catalog from "./pages/Catalog/Catalog";
import Favorites from "./pages/Favorites/Favorites";
import Cart from "./pages/Cart/Cart";
import axios from './axios';
import {addProductCart} from "../src/redux/slices/cart"
import ListOrders from "./pages/ListOrders/ListOrders";



function App() {
  const dispatch = useDispatch()

  const isAuth = useSelector(state=>state.auth.isAuth)
  useEffect(()=>{
    dispatch(fetchData())
  }, [])

   //добавление тоавров из локальной корзины
   useEffect(()=>{

    if(!isAuth) {
      return
    }
    if(!localStorage.getItem("localCart") || JSON.parse(localStorage.getItem("localCart")).length === 0){
        return
    }

    const localCart = JSON.parse(localStorage.getItem("localCart"))

    localCart.forEach(item=>{
        axios.post("/cartLocal", item)
        .then(respon=> dispatch(addProductCart(respon.data)))
        .catch(err => {
          let dataErr =  JSON.parse(err.config.data) //{idProduct: 1, idSize: 2, currentQuantity: 1} idUser: 16
  
        })
    })


    localStorage.setItem("localCart", JSON.stringify([]))
    window.dispatchEvent(new CustomEvent("localCartUpdated", {detail: true}))
  }, [dispatch, isAuth])

  useEffect(()=>{
    if(!localStorage.getItem("localCart")){
      localStorage.setItem("localCart", JSON.stringify([]))
    }
  }, [])

  return (
    <div className="App">
      <Navbar isAuth={isAuth} isAdmin = {useSelector(state=>state.auth.infoUser?.isadmin)}/>

      <main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/aboutUs" element={<AboutUs />}></Route>
          <Route path="/catalog"element={<Catalog/>}></Route>
          <Route path="/favorites"element={<Favorites/>}></Route>
          <Route path="/cart"element={<Cart/>}></Route>
          <Route path="/history"element={<ListOrders/>}></Route>

          <Route path="/register" element={<Register/>}></Route>
          <Route path="/login" element={<Login/>}></Route>

          {/* <Route path="/portfolio" element={<Portfolio />}></Route> */}
          {/* <Route path="/reviews" element={<Reviews />}></Route> */}
        </Routes>
      </main>

      <Footer />
      
    </div>
  );
}

export default App;


          
