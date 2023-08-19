import { FastifyInstance } from "fastify";

const customerController = require("../controllers/CustomerController");

export async function customerRoutes(app: FastifyInstance) {
  app.post("/customer-create", customerController.createCustomer);
  app.get("/customer-find", customerController.getAllCustomers);
}
