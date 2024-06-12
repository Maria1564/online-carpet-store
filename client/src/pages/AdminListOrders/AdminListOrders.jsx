import React, { useEffect, useState } from 'react'
import s_List from "../ListOrders/ListOrders.module.css"
import s from "./AdminListOrders.module.css"

import Wrapper from '../../layouts/Wrapper/Wrapper'
import { useDispatch, useSelector } from 'react-redux'
import {getAllOrders} from"../../redux/slices/order"
import { MdModeEditOutline } from "react-icons/md";


const AdminListOrders = () => {
    const dispatch = useDispatch()

    //заказы со статусом: в сборке, готов к доставке
    const [filteredOrders, setFilteredOrders] = useState([])

    const listOrders = useSelector(state=> state.order.listOrders)

    //получение списка заказов
    useEffect(()=>{
        dispatch(getAllOrders())
    }, [dispatch])

    //обработка данных
    useEffect(()=>{
        if(listOrders !== null){            
            const newArrayOrders = listOrders.filter(order=> order.status !== "Доставлен" )
            setFilteredOrders(prev=> [...newArrayOrders])
        }
    }, [listOrders])

    // классы для статусов заказа
    const statusStyle = {
        "В сборке" : "assembled",
        "Готов к доставке" : "waiting_pickup",
        "Доставлен" : "completed"
     }

  return (
    <>
        <Wrapper text="Обработка заказов" />
        <section className={s_List.list_orders}>
            <div className="container">
                <div className={s_List.orders}>

                    {!filteredOrders.length ? <h2>Нет заказов</h2> :
                    filteredOrders.map(order => (
                        <div key={order.id} className={s.order}>
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
                    ))}   
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