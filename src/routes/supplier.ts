import { FastifyInstance } from "fastify";

const supplierController = require("../controllers/SupplierController");
// Get All Suppliers - Get One Supplier - Create Supplier - Update Supplier
export async function supplierRoutes(app: FastifyInstance) {
  app.get("/supplier", supplierController.getAllSuppliers);
  app.get("/supplier/:id", supplierController.getSupplier);
  app.post("/supplier", supplierController.createSupplier);
  app.put("/supplier", supplierController.updateSupplier);
  app.delete("/supplier/:id", supplierController.deleteSupplier);
}
