/*
  Warnings:

  - You are about to drop the `provedor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `provedor_id` on the `produto` table. All the data in the column will be lost.
  - Added the required column `fornecedor_id` to the `produto` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "provedor";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "fornecedor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dataInicio" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_produto" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "fornecedor_id" TEXT NOT NULL,
    "financeiro_id" TEXT NOT NULL,
    CONSTRAINT "produto_financeiro_id_fkey" FOREIGN KEY ("financeiro_id") REFERENCES "financeiro" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "produto_fornecedor_id_fkey" FOREIGN KEY ("fornecedor_id") REFERENCES "fornecedor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_produto" ("financeiro_id", "id", "nome") SELECT "financeiro_id", "id", "nome" FROM "produto";
DROP TABLE "produto";
ALTER TABLE "new_produto" RENAME TO "produto";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
