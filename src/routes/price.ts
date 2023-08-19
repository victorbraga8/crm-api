import { FastifyInstance } from "fastify";

const priceController = require("../controllers/PriceController");

export async function priceRouter(app: FastifyInstance) {
  app.get("/prices", priceController.getAllPrices);
  app.post("/price-create", priceController.createPrice);
}
