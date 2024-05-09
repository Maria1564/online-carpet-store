import React, { useEffect, useState } from 'react'
import Wrapper from "../../layouts/Wrapper/Wrapper";

// import s from "../Catalog/Catalog.module.css";
import s from "../Catalog/Card/Card.module.css";
import style from "./Favorites.module.css"
import axios from '../../axios'
import { REACT_APP_SERVER_URL } from "../../config";
import { Button } from "../../components/ui";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { removeFavorite, getFavorites } from "../../redux/slices/favorite";

const Favoristes = () => {
  const [sizes, setSizes] = useState([])

  const dispatch = useDispatch()
  
  const  {favoriteProducts: favorites} =  useSelector(state => state.favorites)
  useEffect(()=>{
    dispatch(getFavorites())
    axios.get("/sizes").then(({data})=>setSizes(data))
  }, [])
    
  const removeHeart = (e)=> {
    let currentCard = e.target.closest(`.${s.card}`)
    const idFavorite = currentCard.getAttribute("id")
    dispatch(removeFavorite({id: idFavorite}))
  }  

  return (
    <>
    <Wrapper text="Избранное" />
    <section>
        <div className="container">
          <div className={style.cards}>
            {(favorites.length == 0 ? <h2 >Пусто</h2> : favorites.map(item => (
                 <div className={`${s.card} ${style.card_favorite}`} key={item.id} id={item.id} >
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
                     <div className={style.heart} onClick={removeHeart}>
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