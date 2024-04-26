import React from 'react'
import s from "./Review.module.css"

const Review = ({name, review}) => {
  return (
    <div className={s.review}>
        <p className={s.name}>{name}</p>
        <p className={s.text}>{review}</p>
    </div>
  ) 
}

export default Review