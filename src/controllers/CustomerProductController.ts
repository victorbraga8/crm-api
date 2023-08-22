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
}

const customerProductController = new CustomerProductController();

module.exports = customerProductController;
