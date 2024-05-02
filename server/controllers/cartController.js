const db = require("../db.js")


//добавление товара в коризну
const addProduct = async(req, res)=>{
    try{
        const {idUser,  idProduct, idSize} = req.body

        if(req.id != idUser){
            return res.status(400).json({
                message: "Неполучилось добавить товар в корзину"
            })
        }

        const cartData = await  db.query("INSERT INTO Cart (idUser,  idProduct, idSize) VALUES ($1, $2, $3) RETURNING *", [idUser, idProduct, idSize])
        const aboutProduct = await db.query("SELECT nameProduct, imagePath FROM Products WHERE id = $1", [cartData.rows[0].idproduct])
        const sizeProduct  = await db.query("SELECT name FROM Sizes WHERE id = $1", [cartData.rows[0].idsize])

        const {idproduct, idsize, ...cartInfo} = cartData.rows[0]
        res.json({
            ...cartInfo,
            ...aboutProduct.rows[0],
            sizeProduct: sizeProduct.rows[0].name,
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