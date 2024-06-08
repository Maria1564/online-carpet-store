import React from 'react'
import s from "./Navbar.module.css"
import { NavLink, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/slices/auth'
import Logo from "../../assets/img/logo.png"
import { BsBasket2Fill } from "react-icons/bs";

const setActive = ({isActive})=>isActive? s.active: ""
const Navbar = ({isAuth, isAdmin}) => {
  console.log("Nav",isAdmin )
  const emailUser = useSelector(state=> state.auth.infoUser?.email)

  console.log(isAuth)

  const dispatch = useDispatch()
  const handlerLogout = ()=>{
    dispatch(logout())
    localStorage.removeItem("token")
  }
  return (
    <header>
      <Link to="/" className={s.logo}>
          <span>FastTafting</span>
        <img src={Logo} alt="logo" />
      </Link>
      <nav >
        <ul className={s.menu}>
          <li><NavLink to="/" className={setActive} >Главная</NavLink></li>
          <li><NavLink to="/aboutUs" className={setActive}>О нас</NavLink></li>
          <li><NavLink to="/catalog" className={setActive}>Каталог</NavLink></li>
          {/* <li><NavLink to="/reviews" className={setActive}>Отзывы</NavLink></li> */}
          {isAuth ?  <>
          {!isAdmin && <li><NavLink to="/favorites" className={setActive}>Избранное</NavLink></li>}

          <span className={s.email}>{emailUser}</span>
          
          <div className={s.auth}>
            {!isAdmin &&  
              <li>
                <Link  to="/cart" className={s.cart_link}><BsBasket2Fill className={s.cart_icon} /></Link>
              </li>
            }
            <li>
              <Link className={s.auth_link} to="/login"  onClick={handlerLogout}>Выход</Link>
            </li>
          </div>
          </>
           : 
          
           <div className={s.auth}>
            <li>
                <Link  to="/login" className={`${s.cart_link} ${s.cart_not_empty}`} ><BsBasket2Fill  className={s.cart_icon} /></Link>
            </li>

           <li>
             <Link className={s.auth_link} to="/register">Регистрация</Link>
           </li>
           <li>
             <Link className={s.auth_link} to="/login">Вход</Link>
           </li>
         </div>}
         
        </ul>
      </nav>
    </header>
  )
}

export default  Navbar