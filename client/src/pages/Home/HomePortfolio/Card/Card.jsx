import React from 'react'
import s from "./Card.module.css"
import { REACT_APP_SERVER_URL } from '../../../../config'

const Card = ({src, alt}) => {
  return (
    <div className={s.card}>
        <div className={s.card_img}>
            <img src={`${REACT_APP_SERVER_URL}${src}`} alt={alt} />
        </div>
        <div className={s.card_content}>
            <p>{alt}</p>
        </div>
    </div>
  )
}

export default Card