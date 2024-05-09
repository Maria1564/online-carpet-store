import React, { useEffect, useState } from 'react'
import Wrapper from "../../layouts/Wrapper/Wrapper";

// import s from "../Catalog/Catalog.module.css";
import style from "./Favorites.module.css"
import axios from '../../axios'

import { useDispatch, useSelector } from 'react-redux';
import {getFavorites } from "../../redux/slices/favorite";
import Card from './Card/Card';

const Favoristes = () => {
  const [sizes, setSizes] = useState([])

  const dispatch = useDispatch()
  
  const  {favoriteProducts: favorites} =  useSelector(state => state.favorites)
  const cartProducts = useSelector(state => state.cart.products);


  useEffect(()=>{
    axios.get("/sizes").then(({data})=>setSizes(data))

    dispatch(getFavorites())
  }, [dispatch])
    

  return (
    <>
    <Wrapper text="Избранное" />
    <section>
        <div className="container">
          <div className={style.cards}>
            {(favorites.length == 0 ? <h2 >Пусто</h2> : favorites.map(item => (
                <Card key={item.id} item={item} sizes={sizes} cartProducts={cartProducts}/>
            )))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Favoristes