import React from 'react'
import {Button, Input} from "../../../components/ui/index.js"
import { Navigate } from 'react-router-dom'
import {useSelector, useDispatch} from "react-redux"
import {registerUser} from "../../../redux/slices/auth.js"
import s from "./Register.module.css"

const Register = () => {
    const dispatch = useDispatch()
    console.log(useSelector(state=> state.auth.isError))
    console.log(useSelector(state=> state.auth.isAuth))
    const handlerSubmit = async(e) => {
        e.preventDefault()

        await dispatch(registerUser());
    }

    const inputFllName= {
        type: "text",
        minLength:"3",
        placeholder: 'fullname',
    }

    const inputEmail= {
        type: "email",
        placeholder: 'email',
    }

    const inputPassword= {
        type: "password",
        minLength: "5",
        placeholder: 'password',
    }
    if(useSelector(state=> state.auth.isAuth)){
        return<Navigate to="/login" />
    }

  return (
    <div className={s.register}>
        <h1>Регистрация</h1>
        <form action="" method='POST' onSubmit={handlerSubmit}>
            <Input attributes={inputFllName}/>
            <Input attributes={inputEmail}/>
            <Input attributes={inputPassword}/>
            {/* <Button text="Зарегистрироаться" type='submit'/> */}
            <button type='submit'>Зарегаться</button>
        </form>
    </div>
  )
}

export default Register