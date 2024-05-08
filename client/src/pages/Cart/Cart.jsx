import React, { useEffect, useState } from 'react'
import s from "./Cart.module.css"

import Wrapper from "../../layouts/Wrapper/Wrapper";
import { Link, Navigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import {useDispatch, useSelector} from "react-redux"
import {getAllCart} from "../../redux/slices/cart"


const Cart = () => {
    
    const dispatch = useDispatch()
    const {products, status} = useSelector(state => state.cart)

    useEffect(()=>{
        dispatch(getAllCart())
    }, [])

    console.log(products)
    return (
        <>
            <Wrapper text="Корзина"/>
            <section>
                <div className="container">
                    <div className={s.cart_wrapper}>
                        <div className={s.list}>
                            <div className="products">
                                {status === "loading" ? <span>Loading...</span> : (!products.length ? <span>Пусто</span> : products.map((item)=>(
                                    <span>${item.nameproduct}</span>
                                )))}
                            </div>
                            <div className={s.list_footer}>
                                    <Link className={s.exit}> <IoIosArrowBack className={s.icon_arrow}/> Продолжить покупки</Link>
                                    <div className={s.box}>
                                        <span className={s.box_price}>Все товары: 10500 руб.</span>
                                        <span className={s.box_price}>Доставка: беслпатно</span>
                                        <span className={s.sum}>Итого: 10500 руб.</span>
                                    </div>
                            </div>
                        </div>
                        <div className={s.payment_card}>Карта для оплаты</div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Cart