import { FastifyInstance } from "fastify";
const productController = require("../controllers/ProductController");

export async function productRoutes(app: FastifyInstance) {
  app.get("/products", productController.getAllProducts);
  app.post("/createproduct", productController.createProduct);
  app.post("/products", productController.getProduct);
  app.put("/products", productController.updateProduct);
  app.delete("/products/:id", productController.deleteProduct);
}
