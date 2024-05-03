import React from 'react'
import s from "./Input.module.css"

const Input = ({attributes}) => {

  return (
    <input className={s.input}  {...attributes} required/>
  )
}

export default Input