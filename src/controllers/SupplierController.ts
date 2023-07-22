import { FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";
import { request } from "http";

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

  async getSupplier(request: FastifyRequest<{ Params: supplierInterface }>) {
    const supplier = await prisma.fornecedor.findUniqueOrThrow({
      where: {
        id: request.params.id,
      },
    });

    return supplier;
  }

  async createSupplier(request: FastifyRequest<{ Body: supplierInterface }>) {
    const createSupplier = await prisma.fornecedor.create({
      data: request.body,
    });
    return createSupplier;
  }

  async updateSupplier(
    request: FastifyRequest<{ Body: supplierInterface }>,
    response: any
  ) {
    const { id, nome, dataInicio } = request.body;

    try {
      const supplier = await prisma.fornecedor.findUniqueOrThrow({
        where: {
          id: id,
        },
      });

      const updateData = {
        nome: nome,
        dataInicio: dataInicio,
      };

      const updateSupplier = await prisma.fornecedor.update({
        where: {
          id: id,
        },
        data: updateData,
      });
      return updateSupplier;
    } catch (error) {
      return response
        .status(404)
        .send({ msg: "Fornecedor não encontrado ou não existente." });
    }
  }

  async deleteSupplier(
    request: FastifyRequest<{ Params: supplierInterface }>,
    response: any
  ) {
    try {
      const supplier = await prisma.fornecedor.findUnique({
        where: {
          id: request.params.id,
        },
      });

      await prisma.fornecedor.delete({
        where: {
          id: request.params.id,
        },
      });

      return { msg: "Fornecedor Deletado" };
    } catch (error) {
      return response
        .status(404)
        .send({ msg: "Fornecedor não encontrado ou já deletado" });
    }
  }
}

module.exports = new SupplierController();
