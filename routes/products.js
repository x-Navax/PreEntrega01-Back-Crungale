import  Router, { json }  from "express";
import __dirname from "../src/utils.js";
import ProductManager from './ProductManager.js';


const productManager = new ProductManager("./products.json");
const productRouter = Router()


productRouter.get('/api/products', async (req, res) => {
    try {
      const limit = parseInt(req.query.limit);
      if (!isNaN(limit) && limit > 0) {
        const products = await productManager.leerProductos(limit);
        res.json(products);
      } else {
        const products = await productManager.leerProductos();
        res.json(products);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  productRouter.get('/api/products/:pid', async (req, res) => {
      try {
        const productId = parseInt(req.params.pid);
        if (isNaN(productId) || productId <= 0) {
          return res.status(400).json({ error: 'El ID no es valido' });
        }
    
        const product = await productManager.obtenerProducto(productId);
        if (!product) {
          return res.status(404).json({ error: 'Producto no encontrado.' });
        }
    
        res.json(product);
      } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
      }
    });

    productRouter.post('/api/products/add', async (req, res) => {
      try {
        const { title, description, code, price, stock, category, thumbnails } = req.body;
    
        
        if (!title || !description || !code || !price || !stock || !category) {
          return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        }
        const newProduct = {
          title,
          description,
          code,
          price: Number(price), 
          status: true, 
          stock: Number(stock), 
          category,
          thumbnails: thumbnails || [] 
        };
    
        await productManager.cargaProducto(newProduct);
        res.json({status:"OK"});
      } catch (error) {
        console.error('Error al agregar el producto:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
      }
    });

    productRouter.put('/api/products/act/:pid', async (req, res) => {
      try {
        const productId = parseInt(req.params.pid);
        const { title, description, code, price, stock, category, thumbnails, status } = req.body;
    
      
        if (isNaN(productId) || productId <= 0) {
          return res.status(400).json({ error: 'El ID no es válido' });
        }
    
      
        const existingProduct = await productManager.obtenerProducto(productId);
        if (!existingProduct) {
          return res.status(404).json({ error: 'Producto no encontrado.' });
        }
    
     
        existingProduct.title = title || existingProduct.title;
        existingProduct.description = description || existingProduct.description;
        existingProduct.code = code || existingProduct.code;
        existingProduct.price = price || existingProduct.price;
        existingProduct.stock = stock || existingProduct.stock;
        existingProduct.category = category || existingProduct.category;
        existingProduct.thumbnails = thumbnails || existingProduct.thumbnails;
        existingProduct.status = (status !== undefined) ? status : existingProduct.status; 
       
        await productManager.actualizarProducto(productId, req.body);
    
        res.json(existingProduct);
      } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
      }
    });
    
    productRouter.delete('/api/products/del/:pid', async (req, res) => {
      try {
        const productId = parseInt(req.params.pid);
    
       
        if (isNaN(productId) || productId <= 0) {
          return res.status(400).json({ error: 'El ID no es válido' });
        }
    
       
        await productManager.eliminarProducto(productId);
    
        res.json({ message: 'Producto eliminado correctamente.' });
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
      }
    });

    export default productRouter