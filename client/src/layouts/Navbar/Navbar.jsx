import React from 'react'
import s from "./Navbar.module.css"
import { NavLink, Link } from 'react-router-dom'

const setActive = ({isActive})=>isActive? s.active: ""
const Navbar = () => {
  return (
    <header>
      <Link to="/" className={s.logo}>
        FastTafting
      </Link>
      <nav >
        <ul className={s.menu}>
          <li><NavLink to="/" className={setActive} >Главная</NavLink></li>
          <li><NavLink to="/aboutUs" className={setActive}>О нас</NavLink></li>
          <li><NavLink to="/portfolio" className={setActive}>Портфолио</NavLink></li>
          <li><NavLink to="/reviews" className={setActive}>Отзывы</NavLink></li>
        </ul>
      </nav>
    </header>
  )
}

export default  Navbar