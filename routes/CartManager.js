import fs from 'fs/promises';

class CartManager {
  constructor(filePath = "./cart.json") {
    this.path = filePath;
  }

  async leerCarritos() {
    try {
      let data = await fs.readFile(this.path, "utf-8");

      if (!data.trim()) {
        console.log("El archivo de carritos está vacío.");
        return [];
      }

      return JSON.parse(data);
    } catch (error) {
      console.error("Error al leer los carritos:", error);
      throw new Error("Error al leer los carritos");
    }
  }

  async guardarCarritos(carritos) {
    try {
      await fs.writeFile(this.path, JSON.stringify(carritos, null, 2), "utf-8");
    } catch (error) {
      console.error("Error al guardar los carritos:", error);
      throw new Error("Error al guardar los carritos");
    }
  }

  async crearCarrito() {
    try {
      const carritos = await this.leerCarritos();
      const nuevoCarrito = {
        
        products: []
      };
      carritos.push(nuevoCarrito);
      await this.guardarCarritos(carritos);
      return nuevoCarrito;
    } catch (error) {
      throw error;
    }
  }

  async listarProductos(cartId) {
    try {
      const carritos = await this.leerCarritos();
      const carrito = carritos.find(cart => cart.id === cartId);
      if (!carrito) {
        throw new Error("Carrito no encontrado");
      }
      return carrito.products;
    } catch (error) {
      throw error;
    }
  }

  async agregarProducto(cartId, productId, quantity = 1) {
    try {
      const carritos = await this.leerCarritos();
      const carrito = carritos.find(cart => cart.id === cartId);
      if (!carrito) {
        throw new Error("Carrito no encontrado");
      }
      const existingProduct = carrito.products.find(product => product.id === productId);
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        carrito.products.push({ id: productId, quantity });
      }
      await this.guardarCarritos(carritos);
    } catch (error) {
      throw error;
    }
  }
}

export default CartManager;