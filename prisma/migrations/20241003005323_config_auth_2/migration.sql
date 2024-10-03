-- CreateTable
CREATE TABLE "GameData" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "totalCompleted" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "GameData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PuzzleCompleted" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "puzzleId" TEXT NOT NULL,
    "completedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PuzzleCompleted_puzzleId_fkey" FOREIGN KEY ("puzzleId") REFERENCES "Puzzle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Puzzle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "word" TEXT NOT NULL,
    "tip" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Alphabet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "puzzleId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "characters" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Alphabet_puzzleId_fkey" FOREIGN KEY ("puzzleId") REFERENCES "Puzzle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_GameDataToPuzzleCompleted" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_GameDataToPuzzleCompleted_A_fkey" FOREIGN KEY ("A") REFERENCES "GameData" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GameDataToPuzzleCompleted_B_fkey" FOREIGN KEY ("B") REFERENCES "PuzzleCompleted" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" DATETIME,
    "image" TEXT,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "email", "emailVerified", "id", "image", "name", "updatedAt") SELECT "createdAt", "email", "emailVerified", "id", "image", "name", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "GameData_userId_key" ON "GameData"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PuzzleCompleted_puzzleId_key" ON "PuzzleCompleted"("puzzleId");

-- CreateIndex
CREATE UNIQUE INDEX "Alphabet_puzzleId_key" ON "Alphabet"("puzzleId");

-- CreateIndex
CREATE UNIQUE INDEX "Alphabet_name_key" ON "Alphabet"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_GameDataToPuzzleCompleted_AB_unique" ON "_GameDataToPuzzleCompleted"("A", "B");

-- CreateIndex
CREATE INDEX "_GameDataToPuzzleCompleted_B_index" ON "_GameDataToPuzzleCompleted"("B");
