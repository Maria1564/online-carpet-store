const jwt = require("jsonwebtoken")


//проверка токена
module.exports = (req, res, next)=>{
    try {
        const token = (req.headers.authorization || "").split(" ")[1] 


        if(!token) {
            return res.status(400).json({
                message: "нет доступа"
            })
        }


        const decoded = jwt.verify(token, 'secretKey');
        // console.log(decoded)
        req.email = decoded.email
        next()
      } catch(err) {
        console.log(err.message)
        return res.status(400).json({
            message: "Войдите в учётную запись"
        })
      }
}
