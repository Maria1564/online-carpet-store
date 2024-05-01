const db = require("../db.js")

//получение всех товаров
const  getAll = async(req, res)=>{

    const products = await db.query("SELECT * FROM Products")
    res.json(products.rows)
        
}


//получение самых популярных 6 товаров
const getTopProducts = async(req, res)=>{
    
    const topProducts = await db.query("SELECT * FROM Products ORDER BY	favoritesСount DESC LIMIT 6")
    res.json(topProducts.rows)
}

module.exports = {
    getAll,
    getTopProducts,
}