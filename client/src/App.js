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


function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchData())
  }, [])

  useEffect(()=>{
    if(!localStorage.getItem("localCart")){
      localStorage.setItem("localCart", JSON.stringify([]))
    }
  }, [])

  return (
    <div className="App">
      <Navbar isAuth={useSelector(state=>state.auth.isAuth)}/>

      <main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/aboutUs" element={<AboutUs />}></Route>
          <Route path="/catalog"element={<Catalog/>}></Route>
          <Route path="/favorites"element={<Favorites/>}></Route>
          <Route path="/cart"element={<Cart/>}></Route>

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


          
