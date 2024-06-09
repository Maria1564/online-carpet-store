import React from 'react'
import s from "./ItemOrder.module.css"

const ItemOrder = ({orders, idOrder}) => {
  return (
    <div  className={s.order}>
        <span className={s.number_order}>Номер заказа: # {idOrder}</span>
                    
        {orders[idOrder].map((itemOrder, index) => (
                <div key={index} className={s.item_order}>
                    <div className={s.about}>
                        <span className={s.name}>{itemOrder.nameproduct}</span>

                        <div className={s.other}>
                            <span> {itemOrder.sizename} | </span>  
                            <span>{itemOrder.quantity} шт.</span> 
                        </div>
                    </div>
                        <p className={s.price}>{itemOrder.sum} руб.</p>
                </div>
            ))
        }
    </div>
  )
}

export default ItemOrder