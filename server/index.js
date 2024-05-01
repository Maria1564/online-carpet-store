const express = require("express")
const multer = require("multer")


const ProductsController =  require("./controllers/productController.js")
const UserController = require("./controllers/userController.js")
const validation = require("./middleware/validationAuth.js")
const  app = express()
const PORT = 5000

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
app.post("/auth/register", validation.registerValidation , UserController.register)
// app.post("/auth/login", UserController.login)
// app.get("/auth/me", UserController.getMe)


//Создание сервера
app.listen(PORT, (err)=>{
    if (err){
       return  console.log ("Ошибка >> ", err)
    }

    console.log("сервер успешно запущен")
})