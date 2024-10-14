/*
  Warnings:

  - You are about to drop the column `puzzleId` on the `Alphabet` table. All the data in the column will be lost.
  - Added the required column `alphabetid` to the `Puzzle` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Alphabet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "characters" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Alphabet" ("characters", "createdAt", "id", "name", "updatedAt") SELECT "characters", "createdAt", "id", "name", "updatedAt" FROM "Alphabet";
DROP TABLE "Alphabet";
ALTER TABLE "new_Alphabet" RENAME TO "Alphabet";
CREATE UNIQUE INDEX "Alphabet_name_key" ON "Alphabet"("name");
CREATE TABLE "new_Puzzle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "word" TEXT NOT NULL,
    "tip" TEXT NOT NULL,
    "alphabetid" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Puzzle_alphabetid_fkey" FOREIGN KEY ("alphabetid") REFERENCES "Alphabet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Puzzle" ("createdAt", "id", "tip", "updatedAt", "word") SELECT "createdAt", "id", "tip", "updatedAt", "word" FROM "Puzzle";
DROP TABLE "Puzzle";
ALTER TABLE "new_Puzzle" RENAME TO "Puzzle";
CREATE UNIQUE INDEX "Puzzle_alphabetid_key" ON "Puzzle"("alphabetid");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
