import { FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";

interface supplierInterface {
  id: string;
  nome: string;
  dataInicio: string;
}

class SupplierController {
  async getAllSuppliers() {
    const suppliers = await prisma.fornecedor.findMany();
    return suppliers;
  }

  async createSupplier(request: FastifyRequest<{ Body: supplierInterface }>) {
    const { nome, dataInicio } = request.body;
    // request.body.dataInicio = new Date(dataInicio);
    const createSupplier = await prisma.fornecedor.create({
      data: request.body,
    });
    return createSupplier;
  }
}

module.exports = new SupplierController();
