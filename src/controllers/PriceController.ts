import { FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";

interface priceInterface {
  id: string;
  base: number;
  custoTecnico: number;
  liquido: number;
  dataPreco: string;
}

class PriceController {
  async getAllPrices() {
    const prices = await prisma.financeiro.findMany({
      include: {
        produtos: true,
      },
    });
    return prices;
  }
  async getPrice(request: FastifyRequest<{ Params: priceInterface }>) {
    const price = await prisma.financeiro.findUnique({
      where: {
        id: request.params.id,
      },
      include: {
        produtos: true,
      },
    });

    return price;
  }

  async createPrice(request: FastifyRequest<{ Body: priceInterface }>) {
    const price = await prisma.financeiro.create({
      data: request.body,
    });

    return price;
  }

  async updatePrice(
    request: FastifyRequest<{ Body: priceInterface }>,
    response: any
  ) {
    try {
      const price = await prisma.financeiro.findUnique({
        where: {
          id: request.body.id,
        },
      });

      const updatePrice = await prisma.financeiro.update({
        where: { id: request.body.id },
        data: request.body,
      });
      return updatePrice;
    } catch (error) {
      response
        .status(404)
        .send({ msg: "Produto nao encontrado ou inexistente" });
    }
  }
  async deletePrice(
    request: FastifyRequest<{ Params: priceInterface }>,
    response: any
  ) {
    try {
      await prisma.financeiro.delete({
        where: {
          id: request.params.id,
        },
      });
    } catch (error) {
      response.status(404).send({ msg: "Preço não encontrado ou já deletado" });
    }
  }
}
const priceController = new PriceController();
module.exports = priceController;
