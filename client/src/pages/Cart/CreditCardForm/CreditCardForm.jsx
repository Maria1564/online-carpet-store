import React, {useState} from 'react'
import Cards from 'react-credit-cards-2';
import emailjs from '@emailjs/browser';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import  "./CreditCardForm.css"
import {useDispatch} from "react-redux"
import {removeAll} from "../../../redux/slices/cart"
import {getCurrentOrder} from "../../../redux/slices/order"


const CreditCardForm = ({user, haveProducts, sumCart, setIsOpen}) => {
  const dispatch = useDispatch()
  
  //Отправка сообщения на почту
  const sendEmail = (e) => {
    e.preventDefault();
    const total = sumCart()

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
              console.log('SUCCESS!');
              setIsOpen(true)
              document.body.classList.add('modal-open');
              
              alert("Заказ успешно оплачен. Сообщение о заказе придёт к вам на почту")
              setState(prev => ({...prev, number: '', expiry: '', cvc: '', name: ``, focus: ''}))
              dispatch(removeAll())
              
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
                className="form-control"
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
            className="form-control"
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
                className="form-control"
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
                className="form-control"
                placeholder="CVC"
                maxLength="4"
                minLength="3"
                required
                value={state.cvc}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                />
            </div>
            <div className="form_actions">
              <button type='submit' className="btn" disabled = {haveProducts ? false : true}>Оплатить</button>
            </div>
      </form>

        
    </>
  )
}

export default CreditCardForm