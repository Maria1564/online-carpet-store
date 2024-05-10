import React, {useState} from 'react'
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import  "./CreditCardForm.css"

const CreditCardForm = ({userName, haveProducts}) => {
    console.log(userName)
    //состояние карты (полей карты и фокус на поле)
    const [state, setState] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: `${userName}`,
        focus: '',
    })

    const handleInputChange = (evt) => {
        const { name, value } = evt.target;
        
        setState((prev) => ({ ...prev, [name]: value }));
      }
    
      const handleInputFocus = (evt) => {
        setState((prev) => ({ ...prev, focus: evt.target.name }));
    }


    const createOrder = (e)=>{
        e.preventDefault()
        console.log("Прив");
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

        <form className="credit_card_form" onSubmit={(e)=> createOrder(e)}>
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