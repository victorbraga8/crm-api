/*
  Warnings:

  - Added the required column `nome` to the `fornecedor` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_fornecedor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "dataInicio" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_fornecedor" ("dataInicio", "id") SELECT "dataInicio", "id" FROM "fornecedor";
DROP TABLE "fornecedor";
ALTER TABLE "new_fornecedor" RENAME TO "fornecedor";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
