import React from 'react'
import s from "./HomeReviews.module.css"
import { Button } from '../../../components/ui'
import Review from './Review/Review'
import { reviewsPageHome } from '../../../helpers/data'


const HomeReviews = () => {
  return (
    <section className={s.home_reviews}>
        <div className="container">
            <div className="wrapper">
            <h2 className={`section_title ${s.dark}`}>Отзывы</h2>
            <div className={s.reviews}>
                {reviewsPageHome.map(({id, review, name})=>(
                    <Review key={id} review={review} name={name}/>
                ))}
            </div>
            <Button text="Показать все" to="reviews"/>
            </div>
        </div>
    </section>
  )
}

export default HomeReviews