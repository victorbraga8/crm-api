import { prisma } from "../lib/prisma";
import { FastifyRequest } from "fastify";

interface customerInterface {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  responsavel: string;
  inicioContrato: string;
}

class CustomerController {
  async createCustomer(
    request: FastifyRequest<{ Body: customerInterface }>,
    response: any
  ) {
    try {
      const user = await prisma.cliente.create({
        data: request.body,
      });
      return response.status(202).send({ msg: "Cliente Cadastrado" });
    } catch (error) {
      return response.status(500).send({ msg: "Erro na criação do cliente" });
    }
  }

  async getAllCustomers() {
    const customers = await prisma.cliente.findMany();
    return customers;
  }
}

const customerController = new CustomerController();

module.exports = customerController;
