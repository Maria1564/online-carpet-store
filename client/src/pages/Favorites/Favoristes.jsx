import React, { useEffect, useState } from 'react'
import Wrapper from "../../layouts/Wrapper/Wrapper";

import s from "../Catalog/Catalog.module.css";
import style from "./Favorites.module.css"
import axios from '../../axios'
import { REACT_APP_SERVER_URL } from "../../config";
import { Button } from "../../components/ui";
import { FaHeart } from "react-icons/fa";

const Favoristes = () => {
    const [favorites, setFavorites] = useState([])  //{id: 12, idproduct: 5, imagepath: "/uploads/Ghost.png", nameproduct: "Ghost"}
    const [sizes, setSizes] = useState([])

    useEffect(()=>{
        axios.get("/favorites")
        .then(({data})=>{
            setFavorites(data)
            if(data.length){
                axios.get("/sizes").then(({data})=>setSizes(data))
              }
        })
    }, [])

  return (
    <>
    <Wrapper text="Избранное" />
    <section>
        <div className="container">
          <div className={s.cards}>
            {(!favorites.length ? <h2>Loading...</h2> : favorites.map(item => (
                 <div className={`${s.card} ${style.card_favorite}`} key={item.id}>
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
                     <div className={style.heart}>
                        <FaHeart className={style.icon_heart}  />
                     </div>
                 </div>
               </div>
            )))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Favoristes