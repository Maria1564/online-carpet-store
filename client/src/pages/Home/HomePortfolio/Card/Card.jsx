import React from 'react'
import s from "./Card.module.css"

const Card = ({src, alt}) => {
  return (
    <div className={s.card}>
        <div className={s.card_img}>
            <img src={src} alt={alt} />
        </div>
        <div className={s.card_content}>
            <p>{alt}</p>
        </div>
    </div>
  )
}

export default Card