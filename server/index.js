const express = require("express")
const multer = require("multer")
const cors = require("cors")

const  app = express()
const PORT = 5000

const ProductsController =  require("./controllers/productController.js")
const UserController = require("./controllers/userController.js")
const cartController = require("./controllers/cartController.js")
const favoriteController = require("./controllers/favoriteCollection.js")
const orderController = require("./controllers/orderController.js")
const sizeController = require("./controllers/sizeController.js")

const {registerValidation, loginValidation} = require("./middleware/validationAuth.js")
const checkAuth = require("./middleware/checkAuth.js")

app.use(express.json())
app.use(cors())
app.use("/uploads", express.static("uploads"))


//сохранение картинок в uploads
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, "uploads")
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload =  multer({storage}) 


// //?получение картинки(запрос)
// app.post("/upload", upload.single("image"), (req, res)=>{
//     res.json({
//         url: `/uploads/${req.file.originalname}`
//     })
// })




//Товары (запросы)
app.get("/products", ProductsController.getAll)
app.get("/products/top", ProductsController.getTopProducts)
app.post("/products/upload-image", upload.single("image"), ProductsController.addNewProduct)


//Пользоваель (запросы)
app.post("/auth/register", registerValidation, UserController.register)
app.post("/auth/login", loginValidation, UserController.login)
app.get("/auth/me", checkAuth, UserController.getMe)


//Корзина (запросы)
app.get("/cart", checkAuth, cartController.getAll)
app.post("/cart", checkAuth, cartController.addProduct)
app.patch("/cart", checkAuth, cartController.plusOrMinusProduct)
app.delete("/cart/:id", checkAuth, cartController.remove)
app.delete("/cart", checkAuth, cartController.removeAll)

app.post("/cartLocal", checkAuth, cartController.addLocalProduct)

//Избранное (запросы)
app.get("/favorites", checkAuth, favoriteController.getAll)
app.post("/favorites", checkAuth, favoriteController.addFavorite)
app.delete("/favorites/:id", checkAuth, favoriteController.removeOne)

//Заказы (запрос)
app.post("/orders", checkAuth, orderController.create)

//Размеры товара (запрос)
app.get("/sizes", sizeController.getSizes)
app.patch("/sizes", checkAuth, sizeController.changePrice)

//Создание сервера
app.listen(PORT, (err)=>{
    if (err){
       return  console.log ("Ошибка >> ", err)
    }

    console.log("сервер успешно запущен")
})