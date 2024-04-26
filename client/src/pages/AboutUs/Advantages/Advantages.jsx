import React from "react";
import s from "./Advantages.module.css";

const Advantages = () => {
  return (
    <section className={s.advantages_section}>
      <div className="container">
        <div className="wrapper">
          <h2 className={s.advantages_title}>Почему стоит выбрать нас</h2>
          <div className={s.advantages}>
            <div className={s.item}>
              <p className={s.main_text}>+100</p>
              <p className={s.text}>клиентов, которые выбрали нас</p>
            </div>
            <div className={s.item}>
              <p className={s.main_text}>Доступная цена</p>
              <p className={s.text}>мы предлагаем нашим клиентам доступные цены, не снижая качество наших продуктов</p>
            </div>
            <div className={s.item}>
              <p className={s.main_text}> &gt;20</p>
              <p className={s.text}>положительных отзывов от наших клиентов</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advantages;
