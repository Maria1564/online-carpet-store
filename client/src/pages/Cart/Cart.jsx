import React, { useEffect, useState} from 'react'
import s from "./Cart.module.css"

import Wrapper from "../../layouts/Wrapper/Wrapper";
import { Link} from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import {useDispatch, useSelector} from "react-redux"
import {getAllCart,removeAll} from "../../redux/slices/cart"
import Card from './Card/Card';
import CreditCardForm from './CreditCardForm/CreditCardForm';
import Modal from './Modal/Modal';
import { ModalWindow } from '../../components/ui';


const Cart = () => {
    const dispatch = useDispatch()
    const {products} = useSelector(state => state.cart)
    const user = useSelector(state => state.auth.infoUser)
    const [isOpen, setIsOpen] = useState(false)

    //статус модалки при нажатии на кнопку "Очистить корзину"
    const [isOpenModalDelAll, setIsOpenModalDelAll] = useState(false)


    useEffect(()=>{
        dispatch(getAllCart())
    }, [dispatch])
    

   

    
    useEffect(()=>{
        if(products.length === 0){
            window.dispatchEvent(new CustomEvent("cartUpdated", {detail: true}))
        }else{
            window.dispatchEvent(new CustomEvent("cartUpdated", {detail: false}))
        }
    }, [products])

    
    //очистка корзины
    const clearCart = ()=>{
        dispatch(removeAll())
        setIsOpenModalDelAll(false)
        document.body.classList.remove('modal-open')  
    }

    const showModal = () => {
        setIsOpenModalDelAll(true)
        document.body.classList.add('modal-open');
    }

    const btnNoClearCart = () => {
        setIsOpenModalDelAll(false)
        document.body.classList.remove('modal-open')
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
                            {products.length ? <button className={s.btn_clear} onClick={showModal}>Очистить корзину</button> : <></>}
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
                            <CreditCardForm user={user} haveProducts={products.length} sumCart={sumCart} setIsOpen={setIsOpen}/>
                        </div>
                    </div>
                </div>
            </section>

            {isOpen && <Modal setIsOpen={setIsOpen}/>}
            {isOpenModalDelAll && 
                <ModalWindow>
                    <h2>Уверены, что хотите очистить корзину полностью?</h2>
                    <div className={s.btns_modal}>
                        <button onClick={clearCart}>Да</button>
                        <button onClick={btnNoClearCart}>Нет</button>
                    </div>
                </ModalWindow>}
            
        </>
    )
}

export default Cart