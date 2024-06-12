import React from 'react'
import s_admin_list from "../../AdminListOrders/AdminItemOrder/AdminItemOrder.module.css"


export const ArchiveItem = ({order}) => {
    // классы для статусов заказа
    const statusStyle = {
        "В сборке" : "assembled",
        "Готов к доставке" : "waiting_pickup",
        "Доставлен" : "completed"
    }

  return (
    <div  className={s_admin_list.order}>
        <div className={s_admin_list.info}>
            <div className={s_admin_list.details}>
                <span className={s_admin_list.order_number}>Заказ: #{order.id}</span>
                <span className={s_admin_list.email}>({order.useremail})</span>
            </div>
            <sapn className={statusStyle[order.status]}> {order.status}</sapn>
        </div>
        <div className={s_admin_list.other}>
            <span className={s_admin_list.date}>Оформлено: {order.orderdate}</span>
            <span className={s_admin_list.sum}>Сумма: <b>{order.total} руб.</b></span>
        </div>
    </div>
  )
}
