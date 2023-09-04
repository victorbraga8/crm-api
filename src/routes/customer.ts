import { FastifyInstance } from "fastify";

const customerController = require("../controllers/CustomerController");

export async function customerRoutes(app: FastifyInstance) {
  app.get("/customer", customerController.getAllCustomers);
  app.post("/customer", customerController.createCustomer);
  app.get("/customer/:id", customerController.getCustomer);
  app.put("/customer-update", customerController.updateCustomer);
  app.delete("/customer-delete/:id", customerController.deleteCustomer);
}
