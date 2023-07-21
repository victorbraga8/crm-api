-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_fornecedor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "dataInicio" DATETIME NOT NULL
);
INSERT INTO "new_fornecedor" ("dataInicio", "id", "nome") SELECT "dataInicio", "id", "nome" FROM "fornecedor";
DROP TABLE "fornecedor";
ALTER TABLE "new_fornecedor" RENAME TO "fornecedor";
CREATE TABLE "new_produto" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "fornecedor_id" TEXT NOT NULL DEFAULT '',
    "financeiro_id" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "produto_financeiro_id_fkey" FOREIGN KEY ("financeiro_id") REFERENCES "financeiro" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "produto_fornecedor_id_fkey" FOREIGN KEY ("fornecedor_id") REFERENCES "fornecedor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_produto" ("financeiro_id", "fornecedor_id", "id", "nome") SELECT "financeiro_id", "fornecedor_id", "id", "nome" FROM "produto";
DROP TABLE "produto";
ALTER TABLE "new_produto" RENAME TO "produto";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
