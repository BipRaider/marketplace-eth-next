/*
  Warnings:

  - You are about to drop the `Curses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Curses_title_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Curses";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Curs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "coverImage" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    CONSTRAINT "Curs_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Author_Curs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "authorId" INTEGER NOT NULL,
    "curseId" INTEGER NOT NULL,
    CONSTRAINT "Author_Curs_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Author_Curs_curseId_fkey" FOREIGN KEY ("curseId") REFERENCES "Curs" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Wsl" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cursesId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    CONSTRAINT "Wsl_cursesId_fkey" FOREIGN KEY ("cursesId") REFERENCES "Curs" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Wsl" ("cursesId", "id", "text") SELECT "cursesId", "id", "text" FROM "Wsl";
DROP TABLE "Wsl";
ALTER TABLE "new_Wsl" RENAME TO "Wsl";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Curs_title_key" ON "Curs"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Author_Curs_curseId_key" ON "Author_Curs"("curseId");
