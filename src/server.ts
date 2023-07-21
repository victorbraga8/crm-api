import fastify from "fastify";
import { prisma } from "./lib/prisma";

import { userRoutes } from "./routes/user";
import { productRoutes } from "./routes/product";
import { supplierRoutes } from "./routes/supplier";
import console from "console";

const app = fastify();
app.register(userRoutes);
app.register(productRoutes);
app.register(supplierRoutes);

app.listen({ port: 3333 }, () => {
  console.log("Servidor Rodando");
});
