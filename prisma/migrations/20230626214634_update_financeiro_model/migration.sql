/*
  Warnings:

  - You are about to drop the column `bruto` on the `financeiro` table. All the data in the column will be lost.
  - Added the required column `custoTecnico` to the `financeiro` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_financeiro" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "base" INTEGER NOT NULL,
    "custoTecnico" INTEGER NOT NULL,
    "liquido" INTEGER NOT NULL,
    "dataPreco" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_financeiro" ("base", "dataPreco", "id", "liquido") SELECT "base", "dataPreco", "id", "liquido" FROM "financeiro";
DROP TABLE "financeiro";
ALTER TABLE "new_financeiro" RENAME TO "financeiro";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
