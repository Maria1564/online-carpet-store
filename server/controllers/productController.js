const db = require("../db.js")

//получение всех товаров
const  getAll = async(req, res)=>{

    const products = await db.query("SELECT * FROM Products ORDER BY id")
    res.json(products.rows)
        
}


//получение самых популярных 6 товаров
const getTopProducts = async(req, res)=>{
    
    const topProducts = await db.query("SELECT * FROM Products ORDER BY	favoritesСount DESC LIMIT 6")
    res.json(topProducts.rows)
}

//добавление нового товара
const addNewProduct = async(req, res)=>{
    try{
        const {originalname} = req.file

    const data = await db.query("INSERT INTO products (nameproduct, imagepath) VALUES ($1, $2)  RETURNING * ", [originalname.split(".")[0], `/uploads/${originalname}`])
  
    res.json(data.rows[0])
    }catch(err){
        console.log(err.message)
        res.status(400).json({
            message: "Не удалось добавить новый товар"
        })
    }
}

module.exports = {
    getAll,
    getTopProducts,
    addNewProduct,
}