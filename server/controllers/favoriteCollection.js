const db = require("../db.js")

//полчние избранных 
const getAll = async(req, res)=>{
    try{
        const favoriteData = await db.query(`SELECT Favorites.id, idProduct, imagePath, nameProduct 
        FROM Favorites, Products, Users 
        WHERE Favorites.idUser = Users.id and Favorites.idProduct = Products.id and idUser = $1`, [req.id])

        res.json(favoriteData.rows)

    }catch(err){
        console.log(err.message)
        res.status(400).json({
            message: "Не получилось показать избранные товары"
        })
    }
}

//добавление товара в избранное
const addFavorite = async(req, res)=>{
    try{
        await db.query("INSERT INTO Favorites (idUser, idProduct) VALUES ($1, $2)", [req.id, req.body.idProduct])

        const favoriteData = await db.query(`SELECT Favorites.id, idProduct, imagePath, nameProduct 
        FROM Favorites, Products, Users 
        WHERE Favorites.idUser = Users.id and Favorites.idProduct = Products.id and idUser = $1  and idProduct = $2`, [req.id, req.body.idProduct])

        await db.query(`UPDATE Products  SET favoritesСount = favoritesСount + 1  WHERE id=$1 `, [req.body.idProduct] )

        res.json(favoriteData.rows[0])

    }catch(err){
        console.log(err.message)
        res.status(400).json({
            message: "Не удалось добавить в избранное"
        })
    }
}

//удаление товара из избранных 
const removeOne = async(req, res)=>{
    try{
        const infoDeletedFavorite = await db.query("DELETE  FROM Favorites WHERE id = $1 RETURNING id", [req.body.idFavorite])
        
        if(!infoDeletedFavorite.rows.length){
            return res.status(400).json({
                message: "Нет данного товара"
            })
        }

        res.json(infoDeletedFavorite.rows[0])

    }catch(err){
        console.log(err.message)
        res.status(400).json({
            message: "Не удалось удалить товар из избранного"
        })
    }
}

module.exports = {
    getAll,
    addFavorite,
    removeOne
}