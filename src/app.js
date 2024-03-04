import cartRouter from './routes/cart.js';
import productRouter from './routes/products.js';
import __dirname from "./utils.js"
import express from 'express';
import handlebars from "express-handlebars"
import { Server } from "socket.io"

const app = express();
const PORT = 8080

app.use(express.urlencoded({extended: true}))

//Middlewares transforma la informacion para que se pueda leer en el navegador
app.engine("handlebars", handlebars.engine())
app.set("views",__dirname+"/views")
app.set("view engine", "handlebars")
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(__dirname+ "/public"))



//Rutas
app.use(productRouter)
app.use(cartRouter)

const server = app.listen(PORT,()=>console.log("Abierto en puerto", PORT))
const io = new Server(server) //instanciando socket.io LLAMANDO AL SERVIDOR

io.on("connection",socket =>{
    console.log("Connected!")
})