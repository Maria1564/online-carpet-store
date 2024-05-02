const db = require("../db.js")


//добавление товара в коризну
const addProduct = async(req, res)=>{
    try{
        const {idUser,  idProduct, idSize} = req.body
        console.log(req.id, idUser)
        if(req.id != idUser){
            return res.status(400).json({
                message: "Неполучилось добавить товар в корзину"
            })
        }

        const cartData = await  db.query("INSERT INTO Cart (idUser,  idProduct, idSize) VALUES ($1, $2, $3) RETURNING *", [idUser, idProduct, idSize])
        const nameProduct = await db.query("SELECT (nameProduct) FROM Products WHERE id = $1", [cartData.rows[0].idproduct])
        const sizeProduct  = await db.query("SELECT (name) FROM Sizes WHERE id = $1", [cartData.rows[0].idsize])
        console.log(sizeProduct)
        res.json({
            id:  cartData.rows[0].id,
            idUser: cartData.rows[0].iduser,
            idProduct: cartData.rows[0].idproduct,
            nameProduct: nameProduct.rows[0].nameproduct,
            sizeProduct: sizeProduct.rows[0].name
        })
    }catch(err){
        console.log(err.message)
        res.status(400).json({
            message: "Неполучилось добавить товар в корзину"
        })
    }
}


module.exports = {
    addProduct
}