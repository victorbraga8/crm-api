import { FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";

interface userInterface {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  responsavel: string;
  inicioContrato: string;
}

class UserController {
  async getAllUsers() {
    const users = await prisma.cliente.findMany({
      include: {
        usuario: true,
        produtoCliente: {
          include: {
            produto: {
              include: {
                financeiro: true,
                fornecedor: true,
              },
            },
          },
        },
      },
    });

    return users;
  }

  async createUser(request: FastifyRequest<{ Body: userInterface }>) {
    const user = await prisma.cliente.create({
      data: request.body,
    });

    return user;
  }

  async getUser(request: FastifyRequest<{ Body: userInterface }>) {
    const { id, nome, email, telefone, responsavel, inicioContrato } =
      request.body;
    const user = await prisma.cliente.findFirst({
      where: {
        OR: [
          { id: id },
          { nome: nome },
          { email: email },
          { telefone: telefone },
          { responsavel: responsavel },
          { inicioContrato: inicioContrato },
        ],
      },
      include: {
        usuario: true,
        produtoCliente: {
          include: {
            produto: {
              include: {
                financeiro: true,
                fornecedor: true,
              },
            },
          },
        },
      },
    });

    return user;
  }

  async updateUser(
    request: FastifyRequest<{ Body: userInterface }>,
    response: any
  ) {
    const { id, nome, email, telefone, responsavel, inicioContrato } =
      request.body;
    try {
      const user = await prisma.cliente.findUniqueOrThrow({
        where: {
          id: id,
        },
      });

      const updateData = {
        id: id,
        nome: nome,
        email: email,
        telefone: telefone,
        responsavel: responsavel,
        inicioContrato: inicioContrato,
      };

      const updateUser = await prisma.cliente.update({
        where: {
          id: id,
        },
        data: updateData,
      });

      return updateUser;
    } catch (error) {
      response.status(404).send({ msg: "Usuário não encontrado" });
    }
  }

  async deleteUser(request: any, response: any) {
    const { id } = request.params;
    try {
      await prisma.cliente.delete({
        where: {
          id: id,
        },
      });
      response.status(200).send({ msg: "Usuário Deletado" });
    } catch (error) {
      response.status(500).send({ msg: "Usuário não existente ou deletado." });
    }
  }
}

module.exports = new UserController();
