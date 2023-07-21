-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_fornecedor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "dataInicio" TEXT NOT NULL
);
INSERT INTO "new_fornecedor" ("dataInicio", "id", "nome") SELECT "dataInicio", "id", "nome" FROM "fornecedor";
DROP TABLE "fornecedor";
ALTER TABLE "new_fornecedor" RENAME TO "fornecedor";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
