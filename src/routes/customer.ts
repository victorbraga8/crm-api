import { FastifyInstance } from "fastify";

const customerController = require("../controllers/CustomerController");

export async function customerRoutes(app: FastifyInstance) {
  app.post("/customer-create", customerController.createCustomer);
  app.get("/customer-find", customerController.getAllCustomers);
  app.get("/customer-find/:id", customerController.getCustomer);
  app.put("/customer-update", customerController.updateCustomer);
  app.delete("/customer-delete/:id", customerController.deleteCustomer);
}
