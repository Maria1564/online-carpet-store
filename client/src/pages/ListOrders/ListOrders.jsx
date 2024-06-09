import React from 'react'
import s from "./ListOrder.module.css"

import Wrapper from '../../layouts/Wrapper/Wrapper'
import ItemOrder from './ItemOrder/ItemOrder';

const ListOrders = () => {

    const orders = {
        "96": [
            {
                "idorder": 96,
                "nameproduct": "Cat",
                "sizename": "большой",
                "quantity": 6,
                "sum": "72000"
            },
            {
                "idorder": 96,
                "nameproduct": "Corgi",
                "sizename": "большой",
                "quantity": 2,
                "sum": "24000"
            },
            {
                "idorder": 96,
                "nameproduct": "Corgi",
                "sizename": "маленький",
                "quantity": 5,
                "sum": "16000"
            },
            {
                "idorder": 96,
                "nameproduct": "Flower",
                "sizename": "маленький",
                "quantity": 2,
                "sum": "6400"
            }
        ],
        "97": [
            {
                "idorder": 97,
                "nameproduct": "DogFace",
                "sizename": "маленький",
                "quantity": 8,
                "sum": "25600"
            },
            {
                "idorder": 97,
                "nameproduct": "DogFace",
                "sizename": "средний",
                "quantity": 2,
                "sum": "13000"
            },
            {
                "idorder": 97,
                "nameproduct": "Smile",
                "sizename": "маленький",
                "quantity": 1,
                "sum": "3200"
            }
        ],
        "98": [
            {
                "idorder": 97,
                "nameproduct": "DogFace",
                "sizename": "маленький",
                "quantity": 8,
                "sum": "25600"
            },
            {
                "idorder": 97,
                "nameproduct": "DogFace",
                "sizename": "средний",
                "quantity": 2,
                "sum": "13000"
            },
            {
                "idorder": 97,
                "nameproduct": "Smile",
                "sizename": "маленький",
                "quantity": 1,
                "sum": "3200"
            }
        ]
    };

  return (
    <>
        <Wrapper text="История заказов" />
        <section className={s.list_orders}>
            <div className="container">
            {/* <h2>Пусто</h2> */}
                <div className={s.orders}>
                    
                { Object.keys(orders)?.map((idOrder)=>(
                    <ItemOrder orders={orders} keys={idOrder} idOrder={idOrder}/>
                ))}
                </div>
            </div>
        </section>
    </>
  )
}

export default ListOrders