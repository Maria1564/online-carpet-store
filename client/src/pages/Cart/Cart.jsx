import React, { useEffect, useState } from 'react'
import s from "./Cart.module.css"

import Wrapper from "../../layouts/Wrapper/Wrapper";
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import {useDispatch, useSelector} from "react-redux"
import {getAllCart} from "../../redux/slices/cart"
import { RxCross2 } from "react-icons/rx";
import { REACT_APP_SERVER_URL } from "../../config";




const Cart = () => {
    const dispatch = useDispatch()
    const {products, status} = useSelector(state => state.cart)

    useEffect(()=>{
        dispatch(getAllCart())
    }, [dispatch])

    //итоговая сумма корзины
    const sumCart = () => products.reduce((currentSum, {price, quantity})=> currentSum + (price * quantity), 0)

    

    console.log(products)
    return (
        <>
            <Wrapper text="Корзина"/>
            <section>
                <div className="container">
                    <div className={s.cart_wrapper}>
                        <div className={s.list}>
                            <div className={s.products}>
                                {status === "loading" ? <span>Loading...</span> : (!products.length ? <span>Пусто</span> : products.map((item)=>(
                                    <div className={s.product} key={item.id}>
                                        <div className={s.about}>
                                            <img src={`${REACT_APP_SERVER_URL}${item.imagepath}`} alt={item.imagepath} width="150px" height="150px"/>
                                            <div className="text">
                                                <p className={s.name}>{item.nameproduct}</p>
                                                <p className={s.size}>{item.name}</p>
                                            </div>
                                        </div>
                                        <div className={s.other}>
                                            <div className={s.wrapper_total}>
                                                <button className={s.btn_minus} disabled={item.quantity === 1 ? true : false}>-</button>
                                                <output className={s.quantity}>{item.quantity}</output>
                                                <button className={s.btn_plus}>+</button>
                                            </div>
                                            <span className={s.price_product}>{item.price} руб</span>
                                            <div className={s.close}>
                                                <RxCross2 className={s.icon_cross} />
                                            </div>
                                        </div>
                                    </div>
                                )))}
                            </div>
                            <div className={s.list_footer}>
                                    <Link className={s.exit} to="/catalog"> <IoIosArrowBack className={s.icon_arrow}/> Продолжить покупки</Link>
                                    <div className={s.box}>
                                        <span className={s.box_price}>Все товары:&nbsp;&nbsp;&nbsp;&nbsp;{sumCart()} руб</span>
                                        <span className={s.box_price}>Доставка:&nbsp;&nbsp;&nbsp;&nbsp;беслпатно</span>
                                        <hr />
                                        <span className={s.sum}>Итого:&nbsp;&nbsp;&nbsp;&nbsp;{sumCart()} руб</span>
                                    </div>
                            </div>
                        </div>
                        <div className={s.payment_card} >Карта для оплаты</div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Cart