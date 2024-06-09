const db = require("../db.js")

//создание заказа
const create = async(req, res)=>{
    try {
        const {total} = req.body
        const currentDate = new Date().toLocaleDateString().split(".").reverse().join("-");
            
        const newOrder = await db.query("INSERT INTO Orders (idUser, total, orderDate) VALUES ($1, $2, $3) returning * ", [req.id, total, currentDate])
        console.log(newOrder)
        const idCurrentOrder = newOrder.rows[0].id

        //добавление товаров из корзины пользователя в список товаров заказа
        await db.query(`INSERT INTO orderItems (idOrder, idProduct, idSize, quantity)
            SELECT $1, idProduct, idSize, quantity FROM Cart WHERE idUser = $2 `, [idCurrentOrder, req.id])

        res.json({...newOrder.rows[0], orderdate:newOrder.rows[0].orderdate.toLocaleDateString().split(".").reverse().join("-")})
        
    } catch (err) {
        console.log(err.message)
        res.status(400).json({
            message: "Не удалось создать заказ"
        })
    }
}

//получение истории заказов
const getHistoryOrders = async(req, res) => {
    try{
        const listOrders = await db.query(`
            SELECT idOrder,  pr.nameProduct, s.name as sizeName, oi.quantity, SUM(oi.quantity * s.price)
            FROM Orders o, orderItems oi, users u, products pr, sizes s
            where o.iduser = u.id and oi.idProduct = pr.id and oi.idSize = s.id and oi.idOrder = o.id and  o.idUser = $1
            GROUP BY oi.idOrder,  pr.nameProduct, s.name, oi.quantity ORDER BY oi.idOrder`, [req.id])

            res.json(listOrders.rows)
    }catch(err){
        console.log(err.message)
        res.status(400).json({
            message: "Не удалось получить историю заказов"
        })
    }
}

module.exports = {
    create,
    getHistoryOrders
}