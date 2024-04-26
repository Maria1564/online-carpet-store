import React from 'react'
import s from "./Wrapper.module.css"

const Wrapper = ({text}) => {
  return (
    <div className={s.wrapper}>
      <h1>{text}</h1>
    </div>
  )
}

export default Wrapper