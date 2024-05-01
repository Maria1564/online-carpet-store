const db = require("../db.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {validationResult} = require("express-validator")


//регистрация
const register = async(req, res)=>{
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.json(errors)
        }

        const {fullName, email, password} =  req.body

        let passwordHash = ""
        passwordHash = await bcrypt.hash(password, 7);

        const {HashedPassword, ...user} = await db.query("INSERT INTO Users (fullName, email, passwordHash) VALUES ($1, $2, $3) RETURNING *", [fullName, email, passwordHash])
        
        res.json(user.rows[0])

    }catch(err){
        console.log(err)
        res.json({
            message: "Не удалось зарегистрирвоаться"
        })
    }

}

//аутентификация (вход в аккаунт)
const login = async (req, res)=>{
    try{

        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.json(errors)
        }
        const {email, password} =req.body

        const  user = await db.query("SELECT * FROM  Users WHERE email = $1", [email])
        if(!user.rows.length) {
            return res.json({
                message: "Пользователь не найден"
            })
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].passwordhash)
        if(!validPassword){
           return res.json({
                message: "Неверный логин или пароль"
            })
        }

        //генерация токена
        const token = jwt.sign(
            {
                id: user.rows[0].id,
                email
            },
            "secretKey",
            {
                expiresIn:"5h" //!
            }
        )

        
        const {passwordhash, ...infoUser} = user.rows[0]

        res.json({
            ...infoUser,
            token
        })

    }catch(err){
        res.json({
            message: "Неверный логин или пароль"
        })
    }
}

//получение своих данных
const getMe = (req, res)=>{}

module.exports = {
    register,
    login,
    getMe,
}