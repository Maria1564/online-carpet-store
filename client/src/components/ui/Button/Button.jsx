import React from 'react'
import "./Button.css"
import { Link } from 'react-router-dom'



const Button = ({text, to}) => {
  return (
    <button type='button' className="btn"><Link to={`/${to}`}>{text}</Link></button>
  )
}

export default Button