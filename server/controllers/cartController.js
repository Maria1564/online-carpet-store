const db = require("../db.js")


//добавление товара в коризну
const addProduct = async(req, res)=>{
    try{
        const {idProduct, idSize} = req.body

        // if(req.id != idUser){    
        //     return res.status(400).json({
        //         message: "Не получилось добавить товар в корзину"
        //     })
        // }

        const cartData = await  db.query("INSERT INTO Cart (idUser,  idProduct, idSize) VALUES ($1, $2, $3) RETURNING *", [req.id, idProduct, idSize])
        const aboutProduct = await db.query("SELECT imagePath, nameProduct  FROM Products WHERE id = $1", [cartData.rows[0].idproduct])
        const sizeProduct  = await db.query("SELECT name, price FROM Sizes WHERE id = $1", [cartData.rows[0].idsize])

        const {quantity, ...cartInfo} = cartData.rows[0]
        res.json({
            ...cartInfo,
            ...aboutProduct.rows[0],
            name: sizeProduct.rows[0].name,
            quantity,
            price: sizeProduct.rows[0].price
        })
    }catch(err){
        console.log(err.message)
        res.status(400).json({
            message: "Не получилось добавить товар в корзину"
        })
    }
}


//получене всех товаров
const getAll = async(req, res)=>{
    try{
        
        // if(req.id != req.body.idUser){
        //     return res.status(400).json({
        //         message: "Не получилось показать товары корзины"
        //     })
        // }
        
        const cartData = await db.query(`SELECT Cart.id, idUser, idProduct, idSize, imagePath, nameProduct, Sizes.name , quantity, price
        FROM  Cart, Products, Sizes, Users WHERE idUser = $1 and
        Cart.idUser = Users.id and   Cart.idProduct = Products.id and Cart.idSize = Sizes.id`, [req.id])


        res.json(cartData.rows)

    }catch(err){
        console.log(err.message)
        res.status(400).json({
            message: "Не получилось показать товары корзины"
        })
    }
}


//изменеие кол-ва товара
const plusOrMinusProduct = async(req, res)=>{
    try{
        const {idCart, quantity} = req.body

        // if(req.id != idUser){
        //     return res.status(400).json({
        //         message: "Невозможно изменить количество товара"
        //     })
        // }

        const cartData  = await db.query(`UPDATE Cart  SET quantity = $1  WHERE id=$2 RETURNING *`, [quantity, idCart] )
        
        res.json({
            idCart: cartData.rows[0].id,
            quantity: cartData.rows[0].quantity
        })

    }catch(err){
        console.log(err.message)
        res.status(400).json({
            message: "Невозможно изменить количество товара"
        })
    }
}

//удаление товара 
const remove = async(req, res)=>{
    try{
        
        // if(req.id != req.body.idUser){
        //     return res.status(400).json({
        //         message: "Не получилось убрать товар из корзины"
        //     })
        // }
            console.log(req.params)
        const cartData = await db.query(`DELETE  FROM Cart WHERE id = $1 RETURNING *`, [req.params.id] )
        // console.log(cartData)
        if(!cartData.rows.length){
            return res.status(400).json({
                message: "Нет данного товара"
            })
        }

        res.json({
            idCart: cartData.rows[0].id
        })

    }catch(err){
        console.log(err.message)
        res.status(400).json({
            message: "Не получилось убрать товар из корзины"
        })
    }
}

//очистка корзины
const removeAll = async(req, res)=>{
    try{
        await db.query(`DELETE  FROM Cart WHERE idUser = $1`, [req.id])
        res.json({
            cart: []
        })
    }catch(err){
        console.log(err.message)
        res.status(400).json({
            message: "Не удалось очистить корзину"
        })
    }
}

module.exports = {
    addProduct,
    getAll,
    plusOrMinusProduct,
    remove,
    removeAll
}