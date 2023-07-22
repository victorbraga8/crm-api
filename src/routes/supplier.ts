import { FastifyInstance } from "fastify";

const supplierController = require("../controllers/SupplierController");
// Get All Suppliers - Get One Supplier - Create Supplier - Update Supplier
export async function supplierRoutes(app: FastifyInstance) {
  app.get("/supplier-find", supplierController.getAllSuppliers);
  app.get("/supplier-find/:id", supplierController.getSupplier);
  app.post("/supplier-create", supplierController.createSupplier);
  app.put("/supplier-update", supplierController.updateSupplier);
  app.delete("/supplier-delete/:id", supplierController.deleteSupplier);
}
