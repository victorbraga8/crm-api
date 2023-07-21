-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_produtoCliente" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "produto_id" TEXT NOT NULL,
    "cliente_id" TEXT NOT NULL,
    "vencimento" DATETIME NOT NULL,
    "renovacao" DATETIME NOT NULL,
    CONSTRAINT "produtoCliente_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "produtoCliente_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_produtoCliente" ("cliente_id", "id", "produto_id", "renovacao", "vencimento") SELECT "cliente_id", "id", "produto_id", "renovacao", "vencimento" FROM "produtoCliente";
DROP TABLE "produtoCliente";
ALTER TABLE "new_produtoCliente" RENAME TO "produtoCliente";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
