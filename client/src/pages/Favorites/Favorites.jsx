import React, { useEffect, useState } from 'react'
import Wrapper from "../../layouts/Wrapper/Wrapper";

import s from "../Catalog/Catalog.module.css";
import style from "./Favorites.module.css"
import axios from '../../axios'

import { useDispatch, useSelector } from 'react-redux';
import {getFavorites } from "../../redux/slices/favorite";
import { getAllCart } from '../../redux/slices/cart';
import Card from './Card/Card';
import { ModalWindow } from "../../components/ui";


const Favoristes = () => {
  const [sizes, setSizes] = useState([])
  const [isOpenModal, setIsOpenModal] = useState(false)


  const dispatch = useDispatch()
  
  const  {favoriteProducts: favorites} =  useSelector(state => state.favorites)
  const cartProducts = useSelector(state => state.cart.products);


  useEffect(()=>{
    axios.get("/sizes").then(({data})=>setSizes(data))
    dispatch(getAllCart())
    dispatch(getFavorites())
  }, [dispatch])
   
  
  const closeModal = ()=>{
    setIsOpenModal(false)
    document.body.classList.remove('modal-open');
  } 

  return (
    <>
    <Wrapper text="Избранное" />
    <section>
        <div className="container">
          <div className={style.cards}>
            {(favorites.length === 0 ? <h2 >Пусто</h2> : favorites.map(item => (
                <Card key={item.id} item={item} sizes={sizes} cartProducts={cartProducts} setIsOpenModal={setIsOpenModal}/>
            )))}
          </div>
        </div>
        {isOpenModal && 
          <ModalWindow>
              <h2>Не выбран размер коврика</h2>
              <button className={s.btn} onClick={closeModal}>Ок</button>
          </ModalWindow>}
      </section>
    </>
  )
}

export default Favoristes