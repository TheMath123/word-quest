/*
  Warnings:

  - You are about to drop the `_GameDataToPuzzleCompleted` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `gameDataId` to the `PuzzleCompleted` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_GameDataToPuzzleCompleted_B_index";

-- DropIndex
DROP INDEX "_GameDataToPuzzleCompleted_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_GameDataToPuzzleCompleted";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GameData" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "totalCompleted" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "GameData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_GameData" ("createdAt", "id", "totalCompleted", "updatedAt", "userId") SELECT "createdAt", "id", "totalCompleted", "updatedAt", "userId" FROM "GameData";
DROP TABLE "GameData";
ALTER TABLE "new_GameData" RENAME TO "GameData";
CREATE UNIQUE INDEX "GameData_userId_key" ON "GameData"("userId");
CREATE TABLE "new_Puzzle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "word" TEXT NOT NULL,
    "tip" TEXT NOT NULL,
    "alphabetName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Puzzle_alphabetName_fkey" FOREIGN KEY ("alphabetName") REFERENCES "Alphabet" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Puzzle" ("alphabetName", "createdAt", "id", "tip", "updatedAt", "word") SELECT "alphabetName", "createdAt", "id", "tip", "updatedAt", "word" FROM "Puzzle";
DROP TABLE "Puzzle";
ALTER TABLE "new_Puzzle" RENAME TO "Puzzle";
CREATE TABLE "new_PuzzleCompleted" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "puzzleId" TEXT NOT NULL,
    "completedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gameDataId" TEXT NOT NULL,
    CONSTRAINT "PuzzleCompleted_puzzleId_fkey" FOREIGN KEY ("puzzleId") REFERENCES "Puzzle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PuzzleCompleted_gameDataId_fkey" FOREIGN KEY ("gameDataId") REFERENCES "GameData" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PuzzleCompleted" ("completedAt", "id", "puzzleId") SELECT "completedAt", "id", "puzzleId" FROM "PuzzleCompleted";
DROP TABLE "PuzzleCompleted";
ALTER TABLE "new_PuzzleCompleted" RENAME TO "PuzzleCompleted";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
