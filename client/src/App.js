import AboutUs from "./pages/AboutUs/AboutUs";
import Home from "./pages/Home/Home";
// import Portfolio from "./pages/Portfolio/Portfolio";
import Reviews from "./pages/Reviews/Reviews";
import Footer from "./layouts/Footer/Footer";
import Navbar from "./layouts/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Authorization/Register/Register";
import Login from "./pages/Authorization/Login/Login";

function App() {


  return (
    <div className="App">
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/aboutUs" element={<AboutUs />}></Route>
          {/* <Route path="/portfolio" element={<Portfolio />}></Route> */}
          <Route path="/reviews" element={<Reviews />}></Route>

          <Route path="/register" element={<Register/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
        </Routes>
      </main>

      <Footer />
      
    </div>
  );
}

export default App;
