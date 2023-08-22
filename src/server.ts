import fastify from "fastify";
import { prisma } from "./lib/prisma";

import { userRoutes } from "./routes/user";
import { productRoutes } from "./routes/product";
import { supplierRoutes } from "./routes/supplier";
import { priceRouter } from "./routes/price";
import { customerRoutes } from "./routes/customer";
import { customerProductRoutes } from "./routes/customerproduct";
import console from "console";

const app = fastify();
app.register(userRoutes);
app.register(productRoutes);
app.register(supplierRoutes);
app.register(priceRouter);
app.register(customerRoutes);
app.register(customerProductRoutes);

app.listen({ port: 3333 }, () => {
  console.log("Servidor Rodando");
});
