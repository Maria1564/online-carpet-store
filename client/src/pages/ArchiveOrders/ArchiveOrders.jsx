import React, { useEffect, useState } from 'react'
import s_List from "../ListOrders/ListOrders.module.css"

import Wrapper from '../../layouts/Wrapper/Wrapper'
import { useDispatch, useSelector } from 'react-redux'
import { ArchiveItem } from './ArchiveItem/ArchiveItem'
import {getAllOrders} from"../../redux/slices/order"


const ArchiveOrders = () => {
    const dispatch = useDispatch()

    //заказы со статусом доставлено
    const [filteredOrders, setFilteredOrders] = useState([])

    const listOrders = useSelector(state=> state.order.listOrders)
    //получение списка заказов
    useEffect(()=>{
        dispatch(getAllOrders())
    }, [dispatch])

    //обработка данных
    useEffect(()=>{
        if(listOrders !== null){            
            const newArrayOrders = listOrders.filter(order=> order.status === "Доставлен" )
            setFilteredOrders(prev=> [...newArrayOrders])
        }
    }, [listOrders])

  return (
    <>
        <Wrapper text="Архив заказов" />
        <section className={s_List.list_orders}>
            <div className="container">
                <div className={s_List.orders}>

                    {!filteredOrders.length ? <h2>Нет заказов</h2> :
                    filteredOrders.map(order => (
                        <ArchiveItem key={order.id} order={order}/>
                    ))}   

                </div>
            </div>
        </section>
    </>
  )
}

export default ArchiveOrders