-- CreateTable
CREATE TABLE "Curses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "coverImage" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "author" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    CONSTRAINT "Curses_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Wsl" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cursesId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    CONSTRAINT "Wsl_cursesId_fkey" FOREIGN KEY ("cursesId") REFERENCES "Curses" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL DEFAULT 'User',
    "role" TEXT NOT NULL DEFAULT 'USER'
);
INSERT INTO "new_User" ("createdAt", "id", "name", "role") SELECT "createdAt", "id", coalesce("name", 'User') AS "name", "role" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE TABLE "new_Profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "age" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Profile" ("age", "email", "firstname", "id", "lastname", "userId") SELECT "age", "email", "firstname", "id", "lastname", "userId" FROM "Profile";
DROP TABLE "Profile";
ALTER TABLE "new_Profile" RENAME TO "Profile";
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");
CREATE UNIQUE INDEX "Profile_email_key" ON "Profile"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Curses_title_key" ON "Curses"("title");
