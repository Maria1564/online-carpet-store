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

module.exports = {
    getSizes
}

