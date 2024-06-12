import React, { useEffect, useState } from 'react'
import s from "./ListOrders.module.css"

import axios from "../../axios"
import Wrapper from '../../layouts/Wrapper/Wrapper'
import ItemOrder from './ItemOrder/ItemOrder';

const ListOrders = () => {

    const [orders,setOrders] = useState([])
    const [idOrders, setIdOrders] = useState([])
    //получение и обработка данных
    useEffect(()=>{
       
        axios.get("/orders/history")
        .then(({data})=> {
            setOrders(prev=> [...data])

           const arrIdOrders = data.map(order=> Object.keys(order)[0])
           setIdOrders(prev=> [...arrIdOrders])
        })

    }, [])
    console.log("idOrders", idOrders)
  return (  
    <>
        <Wrapper text="История заказов" />
        <section className={s.list_orders}>
            <div className="container">
                <div className={s.orders}>
                    
                {!orders.length ? <h2>Нет заказов</h2> :
                 idOrders.map((idOrder, index)=>(
                    <ItemOrder itemsOrder={orders[index][idOrder]} key={idOrder} idOrder={idOrder} orderStatus={orders[index]["status"]}/>
                ))}
                </div>
            </div>
        </section>
    </>
  )
}

export default ListOrders