/*
  Warnings:

  - You are about to drop the `financeiro` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "financeiro";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_produto" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "fornecedor_id" TEXT NOT NULL,
    "financeiro_id" TEXT NOT NULL,
    CONSTRAINT "produto_fornecedor_id_fkey" FOREIGN KEY ("fornecedor_id") REFERENCES "fornecedor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_produto" ("financeiro_id", "fornecedor_id", "id", "nome") SELECT "financeiro_id", "fornecedor_id", "id", "nome" FROM "produto";
DROP TABLE "produto";
ALTER TABLE "new_produto" RENAME TO "produto";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
