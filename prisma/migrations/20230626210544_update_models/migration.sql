/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `clientes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Post";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "clientes";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "cliente" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "responsavel" TEXT NOT NULL,
    "inicioContrato" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "produtoCliente" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "produto_id" TEXT NOT NULL,
    "cliente_id" TEXT NOT NULL,
    "vencimento" DATETIME NOT NULL,
    "renovacao" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "financeiro" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "base" INTEGER NOT NULL,
    "liquido" INTEGER NOT NULL,
    "bruto" INTEGER NOT NULL,
    "dataPreco" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_provedor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dataInicio" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_provedor" ("id") SELECT "id" FROM "provedor";
DROP TABLE "provedor";
ALTER TABLE "new_provedor" RENAME TO "provedor";
CREATE TABLE "new_usuario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "login" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "cliente_id" TEXT NOT NULL,
    CONSTRAINT "usuario_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_usuario" ("cliente_id", "id", "login", "senha") SELECT "cliente_id", "id", "login", "senha" FROM "usuario";
DROP TABLE "usuario";
ALTER TABLE "new_usuario" RENAME TO "usuario";
CREATE UNIQUE INDEX "usuario_cliente_id_key" ON "usuario"("cliente_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
