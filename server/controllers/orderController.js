const db = require("../db.js")

//создание заказа
const create = async(req, res)=>{
    try {
        const {total} = req.body
        const currentDate = new Date().toLocaleDateString().split(".").reverse().join("-");
            
        const newOrder = await db.query("INSERT INTO Orders (idUser, total, orderDate) VALUES ($1, $2, $3) returning * ", [req.id, total, currentDate])
        
        const idCurrentOrder = newOrder.rows[0].id

        //добавление товаров из корзины пользователя в список товаров заказа
        await db.query(`INSERT INTO orderItems (idOrder, idProduct, idSize, price, quantity)
             SELECT $1, idProduct, idSize, SUM(Sizes.price * quantity), quantity FROM Cart, Sizes
			WHERE Cart.idSize = Sizes.id and idUser = $2
			GROUP BY  idProduct, idSize, quantity `, [idCurrentOrder, req.id])

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
        const listItemsOrders = await db.query(`
            SELECT idOrder,  pr.nameProduct, s.name as sizeName, oi.quantity, oi.price, pr.imagepath
            FROM Orders o, orderItems oi, users u, products pr, sizes s
            WHERE o.iduser = u.id and oi.idProduct = pr.id and oi.idSize = s.id and oi.idOrder = o.id and  o.idUser =$1`, [req.id])

        const arrOrders = await db.query(`
            SELECT orders.id, status
            FROM orders, users
            WHERE users.id = orders.idUser and idUser = $1`, [req.id])
        
        //обработка данных
        const newData = []
        
        arrOrders.rows.length != 0 &&  arrOrders.rows.forEach((order) => {
            // console.log( listItemsOrders.rows)
            let itemsOrder = listItemsOrders.rows.filter(item => item.idorder === order.id )
            itemsOrder = itemsOrder.map(item =>{
                 delete item.idorder
                 return item
                
                })
     
             let newOrderObj = {
                 [order.id] : itemsOrder,
                 "status": order["status"]
             }
             
             newData.push(newOrderObj)
             
        })
    

            res.json(newData)
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