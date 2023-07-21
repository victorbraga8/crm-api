import { FastifyInstance } from "fastify";

const userController = require("../controllers/UserController");

export async function userRoutes(app: FastifyInstance) {
  app.get("/", userController.getAllUsers);
  app.post("/", userController.createUser);
  app.get("/user/:nome", userController.getUser);
  app.put("/user", userController.updateUser);
  app.delete("/user/:id", userController.deleteUser);
}
