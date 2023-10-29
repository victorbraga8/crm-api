import { FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";

interface userInterface {
  id: string;
  login: string;
  senha: string;
  cliente_id: string;
}

class UserController {
  async getAllUsers() {
    const users = await prisma.usuario.findMany({
      include: {
        cliente: true,
      },
    });
    return users;
  }

  async createUser(request: FastifyRequest<{ Body: userInterface }>) {
    const user = await prisma.usuario.create({
      data: request.body,
    });

    return user;
  }

  async getUser(
    request: FastifyRequest<{ Params: userInterface }>,
    response: any
  ) {
    // const { id, nome, email, telefone, responsavel, inicioContrato } =
    //   request.params;
    // const user = await prisma.cliente.findFirst({
    //   where: {
    //     OR: [
    //       { id: id },
    //       { nome: nome },
    //       { email: email },
    //       { telefone: telefone },
    //       { responsavel: responsavel },
    //       { inicioContrato: inicioContrato },
    //     ],
    //   },
    //   include: {
    //     usuario: true,
    //     produtoCliente: {
    //       include: {
    //         produto: {
    //           include: {
    //             financeiro: true,
    //             fornecedor: true,
    //           },
    //         },
    //       },
    //     },
    //   },
    // });

    const { id } = request.params;
    try {
      const user = await prisma.usuario.findUnique({
        where: {
          id,
        },
        include: {
          cliente: true,
        },
      });
      return user;
    } catch (error) {
      response.status(404).send({ msg: "Usuário não encontrado" });
    }
  }

  async updateUser(
    request: FastifyRequest<{ Body: userInterface }>,
    response: any
  ) {
    const { id, login, senha, cliente_id } = request.body;
    try {
      const user = await prisma.usuario.findUniqueOrThrow({
        where: {
          id: id,
        },
      });

      const updateUser = await prisma.usuario.update({
        where: {
          id: id,
        },
        data: request.body,
      });

      return updateUser;
    } catch (error) {
      response.status(404).send({ msg: "Usuário não encontrado" });
    }
  }

  async deleteUser(request: any, response: any) {
    const { id } = request.params;
    try {
      await prisma.usuario.delete({
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
