import React, {useState} from 'react'
import s from "./Card.module.css"
import { RxCross2 } from "react-icons/rx";
import { REACT_APP_SERVER_URL } from "../../../config";
import {plusOne, minusOne, removeOne} from "../../../redux/slices/cart"
import { useDispatch } from 'react-redux';
import { ModalWindow } from '../../../components/ui/index';

const Card = ({item}) => {
    const dispatch = useDispatch()

    //для всплытия/скрытия модалки, отвечающй за удаление одного товара
    const [isOpenModalDel, setIsOpenModalDel] = useState(false)

    const handlerMinus = (idCart, quantity)=>{
        dispatch(minusOne({ idCart, quantity }))
    }

    const handlerPlus = (idCart, quantity)=>{
        dispatch(plusOne({ idCart, quantity }))
    }

    const removeOneProduct = ()=>{
        setIsOpenModalDel(true)
        document.body.classList.add('modal-open');
    }

    const btnYesRemove = (idCart)=>{
        dispatch(removeOne({idCart}))
        setIsOpenModalDel(false)
        document.body.classList.remove('modal-open')
    }

    const  btnNoRemove = ()=>{
        setIsOpenModalDel(false)
        document.body.classList.remove('modal-open')
    }

  return (
  <>
    <div className={s.product} >
        <div className={s.about}>
            <img src={`${REACT_APP_SERVER_URL}${item.imagepath}`} alt={item.imagepath} width="150px" height="150px"/>
            <div className="text">
                <p className={s.name}>{item.nameproduct}</p>
                <p className={s.size}>{item.name}</p>
            </div>
        </div>
        <div className={s.other}>
            <div className={s.wrapper_total}>
                <button className={s.btn_minus} disabled={item.quantity === 1 ? true : false} 
                onClick={()=> handlerMinus(item.id, item.quantity)}>-</button>
                <output className={s.quantity}>{item.quantity}</output>
                <button className={s.btn_plus}
                onClick={()=> handlerPlus(item.id, item.quantity)}>+</button>
            </div>
            <span className={s.price_product}>{item.price} руб</span>
            <div className={s.close} onClick={()=>removeOneProduct()}>
                <RxCross2 className={s.icon_cross} />
            </div>
        </div>
    {isOpenModalDel && 
        <ModalWindow>
            <h2>Уверены, что хотите удалить этот товар из корзины?</h2>
            <div className={s.btns_modal}>
                <button onClick={()=> btnYesRemove(item.id)}>Да</button>
                <button onClick={btnNoRemove}>Нет</button>
            </div>
        </ModalWindow>}
    </div>
  </>
  )
}

export default Card