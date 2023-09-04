import { FastifyInstance } from "fastify";

const supplierController = require("../controllers/SupplierController");
export async function supplierRoutes(app: FastifyInstance) {
  app.get("/supplier", supplierController.getAllSuppliers);
  app.post("/supplier", supplierController.createSupplier);
  app.get("/supplier/:id", supplierController.getSupplier);
  app.put("/supplier-update", supplierController.updateSupplier);
  app.delete("/supplier-delete/:id", supplierController.deleteSupplier);
}
