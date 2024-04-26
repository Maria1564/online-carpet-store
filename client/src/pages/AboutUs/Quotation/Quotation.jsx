import React from "react";
import s from "./Quotation.module.css";

const Quotation = () => {
  return (
    <section className={s.quotation}>
      <div className="container">
        <div className="wrapper">
          <div className={s.box}>
            <p className={s.text}>
              Ты можешь все, что захочешь, если только поверишь в себя.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quotation;
