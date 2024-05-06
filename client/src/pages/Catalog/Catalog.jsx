import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import s from "./Catalog.module.css";
import Wrapper from "../../layouts/Wrapper/Wrapper";
import { Button } from "../../components/ui";
import axios from '../../axios'
import { REACT_APP_SERVER_URL } from "../../config";

const Catalog = () => {
    const [products,setProducts] = useState([])
    const [favorites, setFavorites] = useState([])
    const [sizes, setSizes] = useState([])
    useEffect(()=>{
        axios.get("/products").then(({data})=> {
          setProducts(data)
          if(data.length){
            axios.get("/sizes").then(({data})=>setSizes(data))
          }
        })
        axios.get("/favorites")
        .then(({data})=>{
            setFavorites(data)
            
        })
    }, [])

    const isFavotie = (id)=>{
      return favorites.some((favorite) =>favorite.idproduct == id)
    }
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
                   <div className={s.sizes}>
                    {sizes.length && sizes.map(({id, name, price})=>(
                      <div className={s.size} key={id}>
                        <span className={s.size_name}>{name}</span>
                        <span className={s.price}>{price}руб.</span>
                      </div>
                    ))}
                   </div>
                   <div className={s.btns}>
                     <Button text="Добавить" className={s.btn_catalog}/>
                     {/* <FaHeart className={s.icon_heart} /> */}
                     {isFavotie(item.id) ? <FaHeart className={s.icon_heart} style={{fill: "red"}}/> : <FaHeart className={s.icon_heart}  /> }
                 </div>
               </div>
            )))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Catalog;
