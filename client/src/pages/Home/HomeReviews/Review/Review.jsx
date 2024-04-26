import React from 'react'
import s from "./Review.module.css"
import {ReactComponent as DoubleQuote} from "../../../../assets/img/pageHome/double_quote.svg" 


const Review = ({review, name}) => {
  return (
    <div className={s.item}>
        <DoubleQuote className={s.double_quote}/>
        <p className={s.text}>{review}</p>
        <p className={s.name}>{name}</p>
    </div>
  )
}

export default Review