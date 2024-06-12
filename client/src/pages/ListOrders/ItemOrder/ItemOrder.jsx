import React from 'react'
import s from "./ItemOrder.module.css"

import { REACT_APP_SERVER_URL } from "../../../config";

const ItemOrder = ({itemsOrder, idOrder, orderStatus}) => {

    // классы для статусов заказа
    const statusStyle = {
       "В сборке" : "assembled",
       "Готов к доставке" : "waiting_pickup",
       "Доставлен" : "completed"
    }

  return (
    <div  className={s.order}>
        <div className={s.info}>
            <div className="">
                <span className={`${statusStyle[orderStatus]}`}>{orderStatus}</span>
                <span className={s.number_order}>Номер заказа: #{idOrder}</span>
            </div>   
        
        <span>Сумма: <b>{itemsOrder.reduce((acc, item)=>acc +Number(item.price) , 0)}</b>  руб.</span>
        </div>


        {itemsOrder.map((itemOrder, index) => (
                <div key={index} className={s.item_order}>
                    <div className={s.info_order}>
                    <img src={`${REACT_APP_SERVER_URL}${itemOrder.imagepath}`} alt={itemOrder.nameproduct} />
                    <div className={s.about}>
                        <span className={s.name}>{itemOrder.nameproduct}</span>

                        <div className={s.other}>
                            <span> {itemOrder.sizename} | </span>  
                            <span>{itemOrder.quantity} шт.</span> 
                        </div>
                    </div>
                    </div>
                        <p className={s.price}>{itemOrder.price} руб.</p>
                </div>
            ))
        }
    </div>
  )
}

export default ItemOrder