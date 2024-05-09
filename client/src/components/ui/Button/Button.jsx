import React from 'react'
import "./Button.css"
import { Link } from 'react-router-dom'



const Button = ({text, className, to = "", type="button"}) => {
  
  return (
   (to ? <button type={type} className="btn"><Link to={`/${to}`}>{text}</Link></button>: <button type={type} className={`btn ${className && className}`}>{text}</button>)
  )
}

export default Button