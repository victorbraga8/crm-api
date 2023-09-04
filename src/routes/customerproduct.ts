import { FastifyInstance } from "fastify";

const customerProductController = require("../controllers/CustomerProductController");

export async function customerProductRoutes(app: FastifyInstance) {
  app.get("/customerproduct", customerProductController.getAllCustomerProduct);
  app.post(
    "/customerproduct-create",
    customerProductController.createCustomerProduct
  );
  app.get(
    "/customerproduct/:cliente_id",
    customerProductController.getCustomerProduct
  );
  // app.put("/customerproduct-update")
  //   app.get("/customer-find", customerController.getAllCustomers);
  //   app.get("/customer-find/:id", customerController.getCustomer);
  //   app.put("/customer-update", customerController.updateCustomer);
  //   app.delete("/customer-delete/:id", customerController.deleteCustomer);
}
