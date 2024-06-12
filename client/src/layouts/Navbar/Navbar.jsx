import React, { useEffect, useState } from 'react'
import s from "./Navbar.module.css"
import { NavLink, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/slices/auth'
import Logo from "../../assets/img/logo.png"
import { BsBasket2Fill } from "react-icons/bs";
import { getAllCart } from '../../redux/slices/cart'

const setActive = ({isActive})=>isActive? s.active: ""
const Navbar = ({isAuth, isAdmin}) => {
  const emailUser = useSelector(state=> state.auth.infoUser?.email)
  const dispatch = useDispatch()
  const arrProducts = useSelector(state=> state.cart.products)

  
  //пустая ли локальная корзина
  const [localCartIsEmpty, setLocalCartIsEmpty] = useState(true)

  //пустая ли корзина авторизованного пользователя
  const [cartIsEmpty, setCartIsEmpty] = useState(true)

  useEffect(()=>{
    //подписка на событие localCartUpdated
    window.addEventListener("localCartUpdated", (e)=>setLocalCartIsEmpty(e.detail))
    
    //подписка на событие cartUpdated
    window.addEventListener("cartUpdated", (e)=> setCartIsEmpty(e.detail))
  }, [])


  // console.log(isAuth)


  //получение данных о корзине при входе в аккаунт
  useEffect(()=>{
      if(isAuth) dispatch(getAllCart())
    
  }, [isAuth])


  useEffect(()=>{
    if(isAuth && !isAdmin && arrProducts.length){
      setCartIsEmpty(false)
      return
    }

    setCartIsEmpty(true)
    
    
  }, [arrProducts, isAdmin, isAuth])


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
        {!isAdmin && 
        <>
          <li><NavLink to="/" className={setActive} >Главная</NavLink></li>
          <li><NavLink to="/aboutUs" className={setActive}>О нас</NavLink></li>
        </>
        }

          <li><NavLink to="/catalog" className={setActive}>Каталог</NavLink></li>

          {isAuth ? 
          <>

            {!isAdmin ? 
            <>
              <li>
                <NavLink to="/favorites" className={setActive}>Избранное</NavLink>
              </li>
              <li>
                <NavLink to="/history" className={setActive}>История</NavLink>
              </li>
            </>
            : 
            <>
              <li><NavLink to="/orders" className={setActive}>Обработка заказов</NavLink></li>
              <li><NavLink to="/orders-archive" className={setActive}>Архив заказов</NavLink></li>
            </>

              }

            <span className={s.email}>{emailUser}</span>
            
            <div className={s.auth}>
              {!isAdmin &&  
                <li>
                  <Link  to="/cart" className={`${s.cart_link} ${cartIsEmpty === false && s.cart_not_empty}`}><BsBasket2Fill className={s.cart_icon} /></Link>
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
                <Link  to="/login" className={`${s.cart_link} ${localCartIsEmpty === false && s.cart_not_empty}`} ><BsBasket2Fill  className={s.cart_icon} /></Link>
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

          {/* <li><NavLink to="/reviews" className={setActive}>Отзывы</NavLink></li> */}

export default  Navbar