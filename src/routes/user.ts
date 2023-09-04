import { FastifyInstance } from "fastify";

const userController = require("../controllers/UserController");

export async function userRoutes(app: FastifyInstance) {
  app.get("/user", userController.getAllUsers);
  app.post("/user", userController.createUser);
  app.get("/user/:id", userController.getUser);
  app.put("/user-update/:id", userController.updateUser);
  app.delete("/user-delete/:id", userController.deleteUser);
}
