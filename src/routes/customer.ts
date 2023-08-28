import { FastifyInstance } from "fastify";

const customerController = require("../controllers/CustomerController");

export async function customerRoutes(app: FastifyInstance) {
  app.get("/customer", customerController.getAllCustomers);
  app.get("/customer/:id", customerController.getCustomer);
  app.post("/customer", customerController.createCustomer);
  app.put("/customer-update", customerController.updateCustomer);
  app.delete("/customer-delete/:id", customerController.deleteCustomer);
}
