import React, {useState, useEffect} from "react";
import s from "./Catalog.module.css";
import Wrapper from "../../layouts/Wrapper/Wrapper";
import axios from '../../axios'
import {useDispatch, useSelector } from "react-redux";
import {  getFavorites } from "../../redux/slices/favorite";
import { getAllCart} from "../../redux/slices/cart";


import Card from "./Card/Card";

const Catalog = () => {

    const [products,setProducts] = useState([])
    const [sizes, setSizes] = useState([])
    const dispatch = useDispatch()

    const favorites = useSelector(state => state.favorites.favoriteProducts);
    const cartProducts = useSelector(state => state.cart.products);
    
    useEffect(() => {
      axios.get("/products").then(({ data }) => {
          setProducts(data)
          if (data.length) {
              axios.get("/sizes").then(({ data }) => setSizes(data))
          }
      })
  }, []);
  
  useEffect(() => {
      dispatch(getFavorites());
      dispatch(getAllCart());
  }, []);
  
  return (
    <>
      <Wrapper text="Каталог" />
      <section>
        <div className="container">
          <div className={s.cards}>
            {(!products.length ? <h2>Loading...</h2> : products.map(item => <Card key={item.id} item={item} sizes={sizes} favorites={favorites}/>))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Catalog;
