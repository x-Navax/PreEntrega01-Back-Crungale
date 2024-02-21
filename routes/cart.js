import  Router, { json }  from "express";
import __dirname from "../src/utils.js";
import CartManager from './CartManager.js';

const cartManager = new CartManager(); 

const cartRouter = Router();



cartRouter.post('/api/carts', async (req, res) => {
  try {
    const newCart = await cartManager.crearCarrito();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


cartRouter.get('/api/carts/:cid', async (req, res) => {
  const cartId = req.params.cid;
  try {
    const products = await cartManager.listarProductos(cartId);
    res.json(products);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});


cartRouter.post('/api/carts/:cid/product/:pid', async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity || 1;
  try {
    await cartManager.agregarProducto(cartId, productId, quantity);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export default cartRouter;