import React from "react";
import s from "./CompanyHistory.module.css";
import Tom from "../../../assets/img/Tom.png" 

const CompanyHistory = () => {
  return (
    <section className={s.history}>
      <div className="container">
        <div className={s.history_wrapper}>

          <div className={s.about}>
            <h3 className={s.title}>История компании</h3>
            <p className={s.text}>
              Наша история начинается с небольшой команды энтузиастов, которая
              разделяет страсть к коврам и красоте интерьера. Мы осознали, что в
              России очень мало людей, занимающихся созданием качественных и
              стильных ковров. Поэтому решили заполнить этот пробел своими
              уникальными изделиями.
            </p>
            <p className={s.text}>
              Мы стартовали свою деятельность с небольшой мастерской, где
              воплощали в жизнь свои идеи и вдохновение. Каждый из нас вносил
              частичку своей души в процесс создания ковров. Спустя несколько
              месяцев у нас начали появляться заказчики. С этого момента мы
              решили назвать нашу команду <span>FastTafting</span>.
            </p>
            <p className={s.text}>
              Сейчас мы гордимся нашей проделанной работой, и наша миссия
              остается неизменной – создавать качественные, стильные и
              уникальные тафтинговые ковры, которые будут придавать комфорт и
              красоту вашему пространству.
            </p>
          </div>
          <img src={Tom} alt="Tom" width="512px" height="432px"/>
        </div>
      </div>
    </section>
  );
};

export default CompanyHistory;
