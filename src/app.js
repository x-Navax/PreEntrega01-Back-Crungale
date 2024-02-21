import cartRouter from '../routes/cart.js';
import productRouter from '../routes/products.js';
import __dirname from "../src/utils.js"
import express from 'express';
const app = express();
const PORT = 8080

app.use(express.urlencoded({extended: true}))

//Middlewares transfdorma la informacion para que se pueda leer en el navegador

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static("public"))


//Rutas
app.use(productRouter)
app.use(cartRouter)

app.listen(PORT, () => {
  console.log('Server abierto en puerto',PORT);
});