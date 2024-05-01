const {body} = require("express-validator")

//проверка на валидность данных тела запроса
const registerValidation = [
    body("fullName", "Укажите имя").isLength({min: 3}),
    body("email", "Неверный формат почты").isEmail(),
    body("password","Пароль должен состоять минимум из 5 символов").isLength({min:5})
]

module.exports = {
    registerValidation
}