import React from "react";
import s from "./Home.module.css";
import HomeAbout from "./HomeAbout/HomeAbout";
import HomePortfolio from "./HomePortfolio/HomePortfolio";
import HomeReviews from "./HomeReviews/HomeReviews";

const Home = () => {
  return (
    <div className={s.Home}>
      <div className={s.wrapper}>
        <div className="container">
          <div className={s.wrapper_content}>
            <div className={s.text}>
              <p>Привет, на связи <span>FastTafting</span></p>
              <p>
                Только у нас ты сможешь заказать коврики с крутыми дизайнами на
                свой вкус и цвет!
              </p>
            </div>
            <div className={s.img_bg}>
              <img src={require("../../assets/img/img-bg.png")} alt="img-bg" />
            </div>
          </div>
        </div>
      </div>
      <HomeAbout/>
      <HomePortfolio/>
      <HomeReviews />
    </div>
  );
};

export default Home;
