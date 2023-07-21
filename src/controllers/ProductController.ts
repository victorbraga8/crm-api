import { FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";

interface productInterface {
  id: string;
  nome: string;
  fornecedor_id: string;
  financeiro_id: string;
}

class ProductController {
  async getAllProducts() {
    const products = await prisma.produto.findMany({
      include: {
        financeiro: true,
        fornecedor: true,
        clientes: {
          include: {
            cliente: true,
          },
        },
      },
    });

    return products;
  }
  async createProduct(request: FastifyRequest<{ Body: productInterface }>) {
    const createProduct = await prisma.produto.create({
      data: request.body,
    });
    return createProduct;
  }
  async getProduct(request: FastifyRequest<{ Body: productInterface }>) {
    // getProduct = async (request: { body: productInterface }) => {
    if (Object.keys(request.body).length > 0) {
      const { id, nome, fornecedor_id, financeiro_id } = request.body;
      const product = await prisma.produto.findMany({
        where: {
          OR: [
            { id: id },
            { nome: nome },
            { financeiro_id: financeiro_id },
            { fornecedor_id: fornecedor_id },
          ],
        },
      });

      return product;
    } else {
      return { msg: "Produto não encontrado." };
    }
  }
  async updateProduct(
    request: FastifyRequest<{ Body: productInterface }>,
    response: any
  ) {
    const { id, nome, fornecedor_id, financeiro_id } = request.body;

    try {
      const product = await prisma.produto.findUnique({
        where: {
          id: id,
        },
      });
      const updateData = {
        id: id,
        nome: nome,
        fornecedor_id: fornecedor_id,
        financeiro_id: financeiro_id,
      };

      const updateProduct = await prisma.produto.update({
        where: {
          id: id,
        },
        data: updateData,
      });

      return updateProduct;
    } catch (error) {
      response.status(404).send({ msg: "Produto não encontrado" });
    }
  }
  async deleteProduct(request: any, response: any) {
    const { id } = request.params;
    try {
      await prisma.produto.delete({
        where: {
          id: id,
        },
      });
      response.status(200).send({ msg: "Produto Deletado" });
    } catch (error) {
      response.status(500).send({ msg: "Produto não existente ou deletado." });
    }
  }
}

module.exports = new ProductController();
