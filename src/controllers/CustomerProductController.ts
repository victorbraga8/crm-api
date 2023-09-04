import { FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";
import helper from "../helper";

// Buscar guia sobre a conversão de export de modulos usando a convensão do Typescript e não mais CommonJS
// const helper = require("../helper");

interface customerProductInterface {
  id: string;
  produto_id: string;
  cliente_id: string;
  vencimento: string;
  renovacao: string;
}

class CustomerProductController {
  async createCustomerProduct(
    request: FastifyRequest<{ Body: customerProductInterface }>
  ) {
    const formatedDate = helper.dateTimeformater();
    const {
      produto_id,
      cliente_id,
      vencimento = formatedDate[0],
      renovacao = formatedDate[1],
    } = request.body;

    const customerProduct = await prisma.produtoCliente.create({
      data: {
        produto_id: produto_id,
        cliente_id: cliente_id,
        vencimento: vencimento,
        renovacao: renovacao,
      },
    });

    return customerProduct;
  }

  async getAllCustomerProduct() {
    const customerProduct = await prisma.produtoCliente.findMany({
      include: {
        cliente: true,
        produto: true,
      },
    });

    return customerProduct;
  }

  async getCustomerProduct(
    request: FastifyRequest<{ Params: customerProductInterface }>,
    response: any
  ) {
    try {
      const customerProduct = await prisma.produtoCliente.findFirstOrThrow({
        where: {
          cliente_id: request.params.cliente_id,
        },
      });
      return customerProduct;
    } catch (error) {
      return response
        .status(404)
        .send({ msg: "Cliente não possui produtos vinculados" });
    }
  }

  async updateCustomerProduct(
    request: FastifyRequest<{ Body: customerProductInterface }>,
    response: any
  ) {
    try {
      const customerProduct = await prisma.produtoCliente.findUnique({
        where: {
          id: request.body.id,
        },
      });

      const updateCustomerProduct = await prisma.produtoCliente.update({
        where: { id: request.body.id },
        data: request.body,
      });

      return updateCustomerProduct;
    } catch (error) {
      return response
        .status(404)
        .send({ msg: "Relação Inexistente ou impossivel de atualizar" });
    }
  }

  async deleteCustomerProduct(
    request: FastifyRequest<{ Params: customerProductInterface }>,
    response: any
  ) {
    try {
      const deleteCustomerProduct = await prisma.produtoCliente.delete({
        where: {
          id: request.params.id,
        },
      });
      return response.status(202).send({ msg: "Relação Excluida" });
    } catch (error) {
      return response
        .status(404)
        .send({ msg: "Relação Inexistente ou Excluida Anteriormente" });
    }
  }
}

const customerProductController = new CustomerProductController();

module.exports = customerProductController;
