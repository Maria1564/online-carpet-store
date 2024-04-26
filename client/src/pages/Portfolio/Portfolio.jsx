import React from 'react'
import s from "./Portfolio.module.css"
import Wrapper from '../../layouts/Wrapper/Wrapper'
import{Corgi, Flower, Money, DogFace, Stitch, Cat, Pikachu, HugeCat, Ghost, HellKitty, Smile} from "../../assets/img/pagePortfolio/imgs"

const arrayImgs = [Corgi, Flower, Money, DogFace, Stitch, Cat, Pikachu, HugeCat, Ghost, HellKitty, Smile]

const Portfolio = () => {
  return (
    <>
      <Wrapper text="Портфолио"/>

      <section className={s.portfolio}>
      <div className="container">
        <div className={s.box}>
          {arrayImgs.map((img, index) =>(
             <div className={s.item} key={index}>
                <img src={img} alt=""/>
              </div>
          ))}
        </div>
      </div>
      </section>
    </>
  )
}

export default Portfolio