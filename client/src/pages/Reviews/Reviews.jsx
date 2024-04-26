import React from "react";
import Wrapper from "../../layouts/Wrapper/Wrapper";
import s from "./Reviews.module.css";
import Review from "./Review/Review";
import { reviews } from "../../helpers/data";


const Reviews = () => {
  return (
    <>
      <Wrapper text="Отзывы" />
      <div className={s.reviews}>
        <div className="container">
            <div className={s.wrapper}>
            {
              reviews.map(({id, name, review})=> (
                <Review key={id} name={name} review={review}/>
              ))
            }
            </div>
        </div>
      </div>
    </>
  );
};

export default Reviews;
