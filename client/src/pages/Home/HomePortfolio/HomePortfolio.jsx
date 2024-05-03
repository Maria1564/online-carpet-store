import React,  { useEffect, useState } from "react";
import s from "./HomePortfolio.module.css";
import Card from "./Card/Card";
import { cards } from "../../../helpers/data";
import axios from '../../../axios'


const HomePortfolio = () => {

  const [topProducts, setTopProducts] = useState([])

  useEffect(()=>{
    axios.get("/products/top")
    .then(response => setTopProducts(response.data))
    
  },[])

  return (
    <section className={s.home_portfolio}>
      <div className="container">
        <div className="wrapper">
          <h2 className="section_title">Портфолио</h2>
          <div className={s.cards}>
                {topProducts?.map(({id, imagepath, nameproduct})=>console.log(topProducts) ||(
                    <Card key={id} src={imagepath} alt={nameproduct}/>
                ))}
            </div>
          </div>
      </div>
    </section>
  );
};

export default HomePortfolio;
