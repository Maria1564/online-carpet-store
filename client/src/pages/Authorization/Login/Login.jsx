import React, {useEffect} from 'react'
import s from "../Register/Register.module.css"
import {Button, Input} from "../../../components/ui/index.js"
import { Navigate } from 'react-router-dom'
import {useSelector, useDispatch} from "react-redux"
import { loginUser, clearError } from '../../../redux/slices/auth.js'

const Login = () => {
    console.log("render")
    const dispatch = useDispatch()
    const {isAuth, isError, infoUser} = useSelector(state => state.auth)

    // Очистка ошибки при создании компонента
    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    const handlerSubmit = async(e) => {
        e.preventDefault()
        const form = new FormData(e.target)
        const email = form.get('email')
        const password = form.get('password')

        const user = {
            email,
            password
        }

        await dispatch(loginUser(user));
    }

    if(isAuth) {
        localStorage.setItem('token', infoUser.token);
        return <Navigate to={"/"} />
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
    return (
        <div className={s.register}>
            <h1>Вход</h1>
            <form action="" method='POST' onSubmit={handlerSubmit}>
                <Input attributes={inputEmail}/>
                <Input attributes={inputPassword}/>
                <div className={s.wrapper_error}>
                    {isError && <span className={s.error}>{isError}</span>}
                </div>
                <Button text="Подтвердить" type='submit'/>
            </form>
        </div>
    )
}

export default Login