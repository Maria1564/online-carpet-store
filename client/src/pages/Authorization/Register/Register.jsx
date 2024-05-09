import React, {useEffect} from 'react'
import {Button, Input} from "../../../components/ui/index.js"
import { Navigate } from 'react-router-dom'
import {useSelector, useDispatch} from "react-redux"
import {registerUser, clearError} from "../../../redux/slices/auth.js"
import s from "./Register.module.css"

const Register = () => {
    const dispatch = useDispatch()
    const {infoUser, isError} = useSelector(state => state.auth)
    
    // Очистка ошибки при создании компонента
    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    const handlerSubmit = async(e) => {
        e.preventDefault()
        const form = new FormData(e.target)
        const userName = form.get('fullname')
        const email = form.get('email')
        const password = form.get('password')

        const user = {
            fullName: userName,
            email,
            password
        }

        await dispatch(registerUser(user));
    }

    const inputFllName= {
        type: "text",
        minLength:"3",
        placeholder: 'fullname',
        name: 'fullname',
    }

    const inputEmail= {
        type: "email",
        placeholder: 'email',
        name: 'email',

    }

    const inputPassword= {
        type: "password",
        minLength: "5",
        placeholder: 'password',
        name: 'password',
    }
    if(infoUser){
        return<Navigate to="/login" />
    }

  return (
    <div className={s.register}>
        <h1>Регистрация</h1>
        <form action="" method='POST' onSubmit={handlerSubmit}>
            <Input attributes={inputFllName}/>
            <Input attributes={inputEmail}/>
            <Input attributes={inputPassword}/>
            <div className={s.wrapper_error}>
                    {isError && <span className={s.error}>{isError}</span>}
            </div>
            {/* <span className={s.error}>Не удалось зарегестрироватся. Попробуйте ввести другой email</span> */}
            <Button text="Подтвердить" type='submit'/>
        </form>
    </div>
  )
}

export default Register