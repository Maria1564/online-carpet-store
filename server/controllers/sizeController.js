const db = require("../db.js")

//полученме размеров
const getSizes = async(rq, res)=>{
    try {
        const sizes = await db.query("SELECT * FROM Sizes")

        res.json(sizes.rows)
    } catch (err) {
        res.status(400).json({
            message: "Не получилось загрузить размеры "
        })
    }
}

//изменение цены
const changePrice = async(req, res)=>{
    const {newPrice, idSize} = req.body
    try{
        const newData = await db.query("UPDATE sizes SET price=$1 WHERE id = $2 RETURNING id, price", [newPrice, idSize])

        if(newData.rows[0].length === 0) return res.status(400).json({
            message: "Не получилось изменить цену"
        })

        res.json(newData.rows[0])
        
    }catch(err){
        console.log(err.message)
        res.status(400).json({
            message: "Не получилось изменить цену"
        })
    }
    
}

module.exports = {
    getSizes,
    changePrice
}

