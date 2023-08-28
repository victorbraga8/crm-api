import { FastifyInstance } from "fastify";

const userController = require("../controllers/UserController");

export async function userRoutes(app: FastifyInstance) {
  app.get("/user", userController.getAllUsers);
  app.get("/user/:id", userController.getUser);
  app.post("/user", userController.createUser);
  app.put("/user", userController.updateUser);
  app.delete("/user/:id", userController.deleteUser);
}
