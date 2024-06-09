import React, { useEffect, useState } from 'react'
import s from "./ListOrder.module.css"

import axios from "../../axios"
import Wrapper from '../../layouts/Wrapper/Wrapper'
import ItemOrder from './ItemOrder/ItemOrder';

const ListOrders = () => {

    const [orders,setOrders] = useState({})
    const arrOrders = []

    //получение и обработка данных
    useEffect(()=>{
        axios.get("/orders/history")
        .then(({data})=>data.forEach((order, index, arr)=>{
            
            if(index !== 0) {
                if(arr[index-1].idorder !== arr[index].idorder){
                    arrOrders.push(arr[index].idorder)
                    }
                    }else{
                        
                        arrOrders.push(order.idorder)
                        }
                        
            const updatedOrders  = {};

            arrOrders.forEach(idOrder => {
                updatedOrders[idOrder] = data.filter(item => item.idorder === idOrder);
                });
            setOrders(prev => ({...prev, ...updatedOrders}))
        }))

    }, [])

    console.log(Object.keys({}).length)
  return (  
    <>
        <Wrapper text="История заказов" />
        <section className={s.list_orders}>
            <div className="container">
                <div className={s.orders}>
                    
                {!Object.keys(orders).length? <h2>Нет заказов</h2> :
                 Object.keys(orders).map((idOrder)=>(
                    <ItemOrder orders={orders} key={idOrder} idOrder={idOrder}/>
                ))}
                </div>
            </div>
        </section>
    </>
  )
}

export default ListOrders