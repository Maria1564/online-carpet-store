import React from 'react'
import { MdModeEditOutline } from "react-icons/md";
import s from "./AdminItemOrder.module.css"


const AdminItemOrder = ({order}) => {

    
    // классы для статусов заказа
    const statusStyle = {
        "В сборке" : "assembled",
        "Готов к доставке" : "waiting_pickup",
        "Доставлен" : "completed"
     }

  return (
    <div  className={s.order}>
        <div className={s.info}>
            <div className={s.details}>
                <span className={s.order_number}>Заказ: #{order.id}</span>
                <span className={s.email}>({order.useremail})</span>
            </div>
            <button className={`admin_btn_status ${statusStyle[order.status]}`}>
                {order.status}
                <span><MdModeEditOutline className={s.icon_pen}/></span>
            </button>
        </div>
        <div className={s.other}>
            <span className={s.date}>Оформлено: {order.orderdate}</span>
            <span className={s.sum}>Сумма: <b>{order.total} руб.</b></span>
        </div>
    </div>
  )
}

export default AdminItemOrder