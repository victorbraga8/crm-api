import { FastifyInstance } from "fastify";

const priceController = require("../controllers/PriceController");

export async function priceRouter(app: FastifyInstance) {
  app.get("/price", priceController.getAllPrices);
  app.post("/price", priceController.createPrice);
  app.get("/price/:id", priceController.getPrice);
  app.put("/price-update/:id", priceController.updatePrice);
  app.delete("/price-delete/:id", priceController.deletePrice);
}
