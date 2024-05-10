import React, { useEffect, useState} from 'react'
import s from "./Cart.module.css"

import Wrapper from "../../layouts/Wrapper/Wrapper";
import { Link} from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import {useDispatch, useSelector} from "react-redux"
import {getAllCart,removeAll} from "../../redux/slices/cart"
import Card from './Card/Card';
import CreditCardForm from './CreditCardForm/CreditCardForm';

const Cart = () => {
    const dispatch = useDispatch()
    const {products} = useSelector(state => state.cart)
    const user = useSelector(state => state.auth.infoUser)
    useEffect(()=>{
        dispatch(getAllCart())
    }, [dispatch])

    
    //очистка корзины
    const clearCart = ()=>{
        if(window.confirm("Вы точно хотите полностью очистить корзину?")){
            dispatch(removeAll())
        }
    }


    //итоговая сумма корзины
    const sumCart = () => products.reduce((currentSum, {price, quantity})=> currentSum + (price * quantity), 0)

    return (
        <>
            <Wrapper text="Корзина"/>
            <section>
                <div className="container">
                    <div className={s.cart_wrapper}>
                        <div className={s.list}>
                            <div className={s.products}>
                                {!products.length ? <h2>Пусто</h2>: products.map((item)=>(
                                  <Card item={item} key={item.id}/>
                                ))}
                            {products.length ? <button className={s.btn_clear} onClick={clearCart}>Очистить корзину</button> : <></>}
                            </div>

                            {products.length ?
                            <div className={s.list_footer}>
                                <Link className={s.exit} to="/catalog"> <IoIosArrowBack className={s.icon_arrow}/> Продолжить покупки</Link>
                                <div className={s.box}>
                                    <span className={s.box_price}>Все товары:&nbsp;&nbsp;&nbsp;&nbsp;{sumCart()} руб</span>
                                    <span className={s.box_price}>Доставка:&nbsp;&nbsp;&nbsp;&nbsp;беслпатно</span>
                                    <hr />
                                    <span className={s.sum}>Итого:&nbsp;&nbsp;&nbsp;&nbsp;{sumCart()} руб</span>
                                </div>
                            </div>: <></>}
                        </div>
                        <div className={s.payment_card} >
                            <CreditCardForm user={user} haveProducts={products.length} sumCart={sumCart}/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Cart