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

  async getCustomer(request: FastifyRequest<{ Params: customerInterface }>) {
    const customer = await prisma.cliente.findUnique({
      where: {
        id: request.params.id,
      },
      include: {
        produtoCliente: true,
      },
    });
    return customer;
  }

  async updateCustomer(
    request: FastifyRequest<{ Body: customerInterface }>,
    response: any
  ) {
    try {
      const user = await prisma.cliente.findUnique({
        where: {
          id: request.body.id,
        },
      });

      const updateUser = await prisma.cliente.update({
        where: {
          id: request.body.id,
        },
        data: request.body,
      });

      return updateUser;
    } catch (error) {
      return response.status(404).send({ msg: "Erro no Update do usuário" });
    }
  }

  async deleteCustomer(
    request: FastifyRequest<{ Params: customerInterface }>,
    response: any
  ) {
    try {
      await prisma.cliente.delete({
        where: {
          id: request.params.id,
        },
      });

      return response.status(202).send({ msg: "Cliente Deletado" });
    } catch (error) {
      return response
        .status(400)
        .send({ msg: "Cliente não Deletado, tente novamente mais tarde" });
    }
  }
}

const customerController = new CustomerController();

module.exports = customerController;
