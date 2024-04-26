import React from "react";
import s from "./HomePortfolio.module.css";
import Card from "./Card/Card";
import { Button } from "../../../components/ui";
import { cards } from "../../../helpers/data";

const HomePortfolio = () => {
  return (
    <section className={s.home_portfolio}>
      <div className="container">
        <div className="wrapper">
          <h2 className="section_title">Портфолио</h2>
          <div className={s.cards}>
                {cards.map(({id, src, alt})=>(
                    <Card key={id} src={src} alt={alt}/>
                ))}
            </div>
          <Button text="Ещё" to="portfolio" />
        </div>
      </div>
    </section>
  );
};

export default HomePortfolio;
