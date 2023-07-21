import { FastifyInstance } from "fastify";

const supplierController = require("../controllers/SupplierController");

export async function supplierRoutes(app: FastifyInstance) {
  app.get("/supplier", supplierController.getAllSuppliers);
  app.post("/supplier", supplierController.createSupplier);
  // app.get("/user/:nome", supplierController.getSupplier);
  // app.put("/user", supplierController.updateSupplier);
  // app.delete("/user/:id", supplierController.deleteSupplier);
}
