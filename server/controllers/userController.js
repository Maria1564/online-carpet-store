const db = require("../db.js")
const bcrypt = require("bcrypt")
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
const login = (req, res)=>{}

//получение своих данных
const getMe = (req, res)=>{}

module.exports = {
    register,
    login,
    getMe,
}