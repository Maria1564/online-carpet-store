import React, {useState} from 'react'
import Cards from 'react-credit-cards-2';
import emailjs from '@emailjs/browser';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import  "./CreditCardForm.css"
import {useDispatch} from "react-redux"
import {removeAll} from "../../../redux/slices/cart"
import {getCurrentOrder} from "../../../redux/slices/order"
import { ModalWindow } from '../../../components/ui/index';


const CreditCardForm = ({user, haveProducts, sumCart, setIsOpen}) => {
  const dispatch = useDispatch()
  
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isValidCard, setIsValidCard] = useState("")

  const [activeInpError, setActiveInpError] = useState({})

  //проверка валидации
  const checkValidation = (dataCreditCard)=> {
    
    const number = Number(dataCreditCard.number)
    if(isNaN(number)){
      setActiveInpError(prev=> ({"number": true}))
      return  "Номер карты невалиден"
    }

    const name = Number(dataCreditCard.name)
    if(!isNaN(name)){
      setActiveInpError(prev=> ({"name": true}))
      return  "имя невалидно"
    }

    const currentYear = String(new Date().getFullYear())
    const cardYear = dataCreditCard.expiry.slice(-2)
    const cardMonth = Number(dataCreditCard.expiry.slice(0, 2))
    if(cardYear < currentYear.slice(-2) || (cardMonth <= 0 || cardMonth > 12)){

      setActiveInpError(prev=> ({"expiry": true}))
      return "месяц или год невалиден"
    }

    const cvc = Number(dataCreditCard.cvc)
    if(isNaN(cvc)){
      setActiveInpError(prev=> ({"cvc": true}))
      return "код CVC невалиден"
    }

    setActiveInpError(prev=> ({}))
    setIsValidCard("")
    return ""
  }


  //Отправка сообщения на почту
  const sendEmail = (e) => {
    e.preventDefault();
    const total = sumCart()
    

    console.log(state)
    const resultValid = checkValidation(state)
    if(resultValid !== "") {
      console.log("resultValid >> ", resultValid)
      console.log("activ >> ", activeInpError)
      setIsValidCard(resultValid)
      return
    }
   


    dispatch(getCurrentOrder({total}))
    .then(({payload})=> {
      if(typeof payload === "string"){
        alert(payload)
        return
      
      }else{        
        const formUser = {
          user_name: user.fullname,
          user_email: user.email,
          message: `Информация о заказе ${payload.id}:
                    Заказ на сумму ${total} руб успешно принят
                    Сокро к нему приступим)`,
        }
  

        const form = document.createElement('form');
        form.innerHTML = `
          <input type="hidden" name="user_name" value="${formUser.user_name}" />
          <input type="hidden" name="user_email" value="${formUser.user_email}" />
          <input type="hidden" name="message" value="${formUser.message}" />
        `
  
        emailjs
          .sendForm('service_56mkc9p', 'template_suf3xte', form, {
            publicKey: 'eovax4d5K02_r9mIB',
          })
          .then(
            () => {

              setIsOpenModal(true)
              document.body.classList.add('modal-open');
              
            },
            (error) => {
              console.log('FAILED...', error);
              alert("К сожаление не удалось создать заказ")
            },
          );
      }
    })
   
  };

  //состояние карты (полей карты и фокус на поле)
  const [state, setState] = useState({
      number: '',
      expiry: '',
      cvc: '',
      name: ``,
      focus: '',
  })

  const handleInputChange = (evt) => {
      const { name, value } = evt.target;
      
      setState((prev) => ({ ...prev, [name]: value }));
    }
  
    const handleInputFocus = (evt) => {
      setState((prev) => ({ ...prev, focus: evt.target.name }));
  }

  //закрыть модальное окно
  const closeFirstModal = () => {
    setIsOpenModal(false)
    document.body.classList.remove('modal-open')

    console.log('SUCCESS!');
    setIsOpen(true)
    document.body.classList.add('modal-open');
    setState(prev => ({...prev, number: '', expiry: '', cvc: '', name: ``, focus: ''}))
    
    dispatch(removeAll())

    window.dispatchEvent(new CustomEvent("cartUpdated"), {detail: true})
  }

  return (
    <>
        <Cards
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus}
        />

        <form className="credit_card_form" onSubmit={(e)=> sendEmail(e)}>
            <input
                type="tel"
                name="number"
                className={`form-control ${activeInpError["number"] ? "inp_error" : ""}`}
                placeholder="Card Number"
                maxLength="22"
                minLength="16"
                required
                value={state.number}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
            />
            <input
            type="text"
            name="name"
            className={`form-control ${activeInpError["name"] ? "inp_error" : ""}`}
            placeholder="Name"
            required
            value={state.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            />
            <div className='form_group'>
                <input
                type="tel"
                name="expiry"
                className={`form-control ${activeInpError["expiry"] ? "inp_error" : ""}`}
                placeholder="11/11"
                pattern="\d\d/\d\d"
                required
                value={state.expiry}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                />
                <input
                type="tel"
                name="cvc"
                className={`form-control ${activeInpError["cvc"] ? "inp_error" : ""}`}
                placeholder="CVC"
                maxLength="4"
                minLength="3"
                required
                value={state.cvc}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                />
            </div>
            <div className="credit_card_wrapper_error">
                    {isValidCard && <span className={"credit_card_error"}>{isValidCard}</span>}
            </div>
            <div className="form_actions">
              <button type='submit' className="btn" disabled = {haveProducts ? false : true}>Оплатить</button>
            </div>
      </form>

      {isOpenModal && 
        <ModalWindow>
            <h2>Заказ успешно оплачен! </h2>
            <p>Сообщение о заказе придёт к вам на почту))</p>
            <button onClick={closeFirstModal}>Ок</button>
        </ModalWindow>}
    </>
  )
}

export default CreditCardForm