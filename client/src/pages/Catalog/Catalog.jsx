import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import s from "./Catalog.module.css";
import Wrapper from "../../layouts/Wrapper/Wrapper";
import { Button } from "../../components/ui";
import axios from '../../axios'
import { REACT_APP_SERVER_URL } from "../../config";

const Catalog = () => {
    const [products,setProducts] = useState([])
    useEffect(()=>{
        axios.get("/products").then(({data})=> setProducts(data))
    }, [])
  return (
    <>
      <Wrapper text="Каталог" />
      <section>
        <div className="container">
          <div className={s.cards}>
            {(!products.length ? <h2>Loading...</h2> : products.map(item => (
                 <div className={s.card} key={item.id}>
                 <img src={`${REACT_APP_SERVER_URL}${item.imagepath}`} alt={item.nameproduct} className={s.img_product} />
                   <span className={s.name}>{item.nameproduct}</span>
                   <div className={s.btns}>
                     <Button text="Добавить" className={s.btn_catalog}/>
                     <FaHeart className={s.icon_heart}  />
                 </div>
               </div>
            )))}
            {/* <div className={s.card}>
              <img src="https://content2.flowwow-images.com/data/flowers/524x524/59/1687372485_86480659.jpg" alt="" className={s.img_product} />
              <div className={s.info}>
                <span className={s.name}>Назване карточки</span>
                <div className={s.btns}>
                  <Button text="Добавить" className={s.btn_catalog}/>
                  <FaHeart className={s.icon_heart}  />
                </div>
              </div>
            </div>
            <div className={s.card}>
              <img src="https://content2.flowwow-images.com/data/flowers/524x524/59/1687372485_86480659.jpg" alt="" className={s.img_product} />
              <div className={s.info}>
                <span className={s.name}>Назване карточки</span>
                <div className={s.btns}>
                  <Button text="Добавить" className={s.btn_catalog}/>
                  <FaHeart className={s.icon_heart}  />
                </div>
              </div>
            </div>
            <div className={s.card}>
              <img src="https://content2.flowwow-images.com/data/flowers/524x524/59/1687372485_86480659.jpg" alt="" className={s.img_product} />
              <div className={s.info}>
                <span className={s.name}>Назване карточки</span>
                <div className={s.btns}>
                  <Button text="Добавить" className={s.btn_catalog}/>
                  <FaHeart className={s.icon_heart}  />
                </div>
              </div>
            </div>
            <div className={s.card}>
              <img src="https://content2.flowwow-images.com/data/flowers/524x524/59/1687372485_86480659.jpg" alt="" className={s.img_product} />
              <div className={s.info}>
                <span className={s.name}>Назване карточки</span>
                <div className={s.btns}>
                  <Button text="Добавить" className={s.btn_catalog}/>
                  <FaHeart className={s.icon_heart}  />
                </div>
              </div>
            </div>
            <div className={s.card}>
              <img src="https://content2.flowwow-images.com/data/flowers/524x524/59/1687372485_86480659.jpg" alt="" className={s.img_product} />
              <div className={s.info}>
                <span className={s.name}>Назване карточки</span>
                <div className={s.btns}>
                  <Button text="Добавить" className={s.btn_catalog}/>
                  <FaHeart className={s.icon_heart}  />
                </div>
              </div>
            </div>
            <div className={s.card}>
              <img src="https://content2.flowwow-images.com/data/flowers/524x524/59/1687372485_86480659.jpg" alt="" className={s.img_product} />
              <div className={s.info}>
                <span className={s.name}>Назване карточки</span>
                <div className={s.btns}>
                  <Button text="Добавить" className={s.btn_catalog}/>
                  <FaHeart className={s.icon_heart}  />
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Catalog;
