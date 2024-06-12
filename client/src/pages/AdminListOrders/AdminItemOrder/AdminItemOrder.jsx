import React, { useEffect, useState } from 'react'
import { MdModeEditOutline } from "react-icons/md";
import s from "./AdminItemOrder.module.css"
import { ModalWindow } from '../../../components/ui';
import axios from "../../../axios"
import { useDispatch} from 'react-redux';
import { changeStatusOrder } from '../../../redux/slices/order';


const AdminItemOrder = ({order}) => {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [statuses, setStatuses] = useState([])

    const dispatch = useDispatch()

    // классы для статусов заказа
    const statusStyle = {
        "В сборке" : "assembled",
        "Готов к доставке" : "waiting_pickup",
        "Доставлен" : "completed"
    }

    //получение всех статусов
    useEffect(()=>{
        axios.get("/order/all-statuses")
        .then(({data})=> setStatuses(prev=> [...data]))
     }, [])

    //для открытия мольного кона
    const handlerOpenModal = () => {
        setIsOpenModal(true)
        document.body.classList.add('modal-open');
    }


    //изменение статуса заказа
    const changeStatus = (e)=>{
        const newStatus = e.currentTarget.textContent
        dispatch(changeStatusOrder({idOrder: order.id, newStatus}))

        setIsOpenModal(false)
        document.body.classList.remove('modal-open');
    }
    
  return (
    <div  className={s.order}>
        <div className={s.info}>
            <div className={s.details}>
                <span className={s.order_number}>Заказ: #{order.id}</span>
                <span className={s.email}>({order.useremail})</span>
            </div>
            <button className={`admin_btn_status ${statusStyle[order.status]}`} onClick={handlerOpenModal}>
                {order.status}
                <span><MdModeEditOutline className={s.icon_pen}/></span>
            </button>
        </div>
        <div className={s.other}>
            <span className={s.date}>Оформлено: {order.orderdate}</span>
            <span className={s.sum}>Сумма: <b>{order.total} руб.</b></span>
        </div>

       {
        isOpenModal &&
            <ModalWindow>
                <h2>Выберите статус заказа {order.id}</h2>
                <div className={s.list_status}>
                    {statuses?.map((elem, index)=>( 
                        <div key={index} className={`${statusStyle[elem]}`} onClick={(e)=>changeStatus(e)}> 
                                {elem}
                        </div>
                    ))}
                </div>
            </ModalWindow>
       }
    </div>
  )
}

export default AdminItemOrder