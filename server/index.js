const express = require("express")
const multer = require("multer")

const  app = express()
const PORT = 5000

const ProductsController =  require("./controllers/productController.js")
const UserController = require("./controllers/userController.js")
const cartController = require("./controllers/cartController.js")
const {registerValidation, loginValidation} = require("./middleware/validationAuth.js")
const checkAuth = require("./middleware/checkAuth.js")

app.use(express.json())
app.use("/uploads", express.static("uploads"))


//сохранние картинок в uploads
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, "uploads")
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload =  multer({storage}) 


//?получение картинки(запрос)
app.post("/upload", upload.single("image"), (req, res)=>{
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})


//Товары (запросы)
app.get("/products", ProductsController.getAll)
app.get("/products/top", ProductsController.getTopProducts)


//Пользоваель (запросы)
app.post("/auth/register", registerValidation, UserController.register)
app.post("/auth/login", loginValidation, UserController.login)
app.get("/auth/me", checkAuth, UserController.getMe)


//Корзина
// app.get("/cart", checkAuth)
app.post("/cart", checkAuth, cartController.addProduct)
// app.post("/cart", checkAuth)
// app.post("/cart", checkAuth)
// app.post("/cart", checkAuth)

//Создание сервера
app.listen(PORT, (err)=>{
    if (err){
       return  console.log ("Ошибка >> ", err)
    }

    console.log("сервер успешно запущен")
})