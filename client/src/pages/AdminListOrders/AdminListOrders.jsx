import React from 'react'
import s_List from "../ListOrders/ListOrders.module.css"

import Wrapper from '../../layouts/Wrapper/Wrapper'

const AdminListOrders = () => {
  return (
    <>
        <Wrapper text="Обработка заказов" />
        <section className={s_List.list_orders}>
            <div className="container">
                <div className={s_List.orders}>
                    
                {/* {!orders.length ? <h2>Нет заказов</h2> :
                idOrders.map((idOrder, index)=>(
                    <ItemOrder itemsOrder={orders[index][idOrder]} key={idOrder} idOrder={idOrder} orderStatus={orders[index]["status"]}/>
                ))} */}
                </div>
            </div>
        </section>
    </>
  )
}

export default AdminListOrders