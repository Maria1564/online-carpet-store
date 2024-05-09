import React, { useEffect} from 'react'
import s from "./Cart.module.css"

import Wrapper from "../../layouts/Wrapper/Wrapper";
import { Link} from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import {useDispatch, useSelector} from "react-redux"
import {getAllCart} from "../../redux/slices/cart"
import Card from './Card/Card';





const Cart = () => {
    const dispatch = useDispatch()
    const {products, status} = useSelector(state => state.cart)

    useEffect(()=>{
        dispatch(getAllCart())
    }, [dispatch])

    

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
                                {!products.length ? <span>Пусто</span>: products.map((item)=>(
                                  <Card item={item} key={item.id}/>
                                ))}
                            {(products.length && status === "loaded") ? <button className={s.btn_clear}>Очистить корзину</button> : <></>}
                            </div>

                            {products.length && status === "loaded" ?
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
                        <div className={s.payment_card} >Карта для оплаты</div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Cart