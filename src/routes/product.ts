import { FastifyInstance } from "fastify";
const productController = require("../controllers/ProductController");
export async function productRoutes(app: FastifyInstance) {
  app.get("/product", productController.getAllProducts);
  app.post("/product", productController.createProduct);
  app.get("/product/:id", productController.getProduct);
  app.put("/product-update", productController.updateProduct);
  app.delete("/product-delete/:id", productController.deleteProduct);
}
