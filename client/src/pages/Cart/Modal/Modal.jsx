import React, { useRef, useState } from 'react'
import s from "./Modal.module.css"

const Modal = ({setIsOpen}) => {
    const inpRef = useRef()
    const [isError,setIsError] = useState(false)
 

    const closeModal = ()=>{
        const phoneNumberPattern = /^8\(\d{3}\)\d{3}-\d{2}-\d{2}$/; 
        //проверка валидации номера телефона
        if(inpRef.current.value!== "" && phoneNumberPattern.test(inpRef.current.value)){
            setIsError(false)
            setIsOpen(false)
            document.body.classList.remove('modal-open');
        }else{
            setIsError(true)
        }
    }


  return (
    <div className={s.modal}>
        <div className={s.modal_wrapper}>
            <h2>Спасибо за покупку!</h2>
            <p>Пожалуйста, укажите ваш контактный номер, чтобы мы могли связаться с вами и уточнить детали доставки вашего заказа</p>
            <input ref={inpRef} type = "tel" required placeholder = '8(999)999-99-99' name ='tel'/>
            <div className={s.error}>
            {isError ? <span>Неверно введён номер телефона</span> : <></>}    
            </div>
            <button className={s.btn} onClick={closeModal}>Ок</button>
            
        </div>
    </div>
  )
}

export default Modal