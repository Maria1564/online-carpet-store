import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import s from "./Catalog.module.css";
import Wrapper from "../../layouts/Wrapper/Wrapper";
import { Button } from "../../components/ui";
import axios from '../../axios'
import { REACT_APP_SERVER_URL } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite, getFavorites } from "../../redux/slices/favorite";

const Catalog = () => {
    const [products,setProducts] = useState([])
    const [sizes, setSizes] = useState([])

    const dispatch = useDispatch()
    const  favorites =  useSelector(state => state.favorites.favoriteProducts)


    useEffect(()=>{
        axios.get("/products").then(({data})=> {
          setProducts(data)
          if(data.length){
            axios.get("/sizes").then(({data})=>setSizes(data))
          }
        })

        dispatch(getFavorites())
    }, [])

    const isFavorite = (id)=>{
      return favorites.some((favorite) =>favorite.idproduct === id)
    }

    const addHeart = (e)=>{
      let currentCard = e.target.closest(`.${s.card}`)
      const idProduct = currentCard.getAttribute("id")

      dispatch(addFavorite({
        idProduct
      }))
    }
    const removeHeart = (e)=>{
      let currentCard = e.target.closest(`.${s.card}`)
      const idProduct = currentCard.getAttribute("id")
      console.log(favorites)
      const currentFavorite = favorites.filter(item => item.idproduct === Number(idProduct))
      dispatch(removeFavorite({
        id: currentFavorite[0].id
      }))
    }

  return (
    <>
      <Wrapper text="Каталог" />
      <section>
        <div className="container">
          <div className={s.cards}>
            {(!products.length ? <h2>Loading...</h2> : products.map(item => (
                 <div className={s.card} key={item.id}  id={item.id}>
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
                     {isFavorite(item.id) ? 
                     <div onClick={removeHeart}><FaHeart className={s.icon_heart} style={{fill: "red"}} /></div> : 
                     <div onClick={addHeart}><FaHeart className={s.icon_heart}  /></div> }
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
