import React, { useRef, useState } from 'react'
import s from "./Modal.module.css"
import { ModalWindow } from '../../../components/ui/index'
import { useNavigate } from 'react-router-dom'

const Modal = ({setIsOpen}) => {
    const inpRef = useRef()
    const [isError,setIsError] = useState(false)

    const navigate = useNavigate();

    const closeModal = ()=>{
        const phoneNumberPattern = /^8\(\d{3}\)\d{3}-\d{2}-\d{2}$/; 
        //проверка валидации номера телефона
        if(inpRef.current.value!== "" && phoneNumberPattern.test(inpRef.current.value)){
            setIsError(false)
            setIsOpen(false)
            document.body.classList.remove('modal-open');
          
            navigate("/catalog"); //при успешном вводе номера и закрытии модального окна
        }else{
            setIsError(true)
        }
    }


  return (
    <ModalWindow>
         <h2>Спасибо за покупку!</h2>
          <p>Пожалуйста, укажите ваш контактный номер, чтобы мы могли связаться с вами и уточнить детали доставки вашего заказа</p>
          <input ref={inpRef} type = "tel" required placeholder = '8(999)999-99-99' name ='tel'/>
          <div className={s.error}>
          {isError ? <span>Неверно введён номер телефона</span> : <></>}    
          </div>
          <button className={s.btn} onClick={closeModal}>Ок</button>
    </ModalWindow>
  )
}

export default Modal