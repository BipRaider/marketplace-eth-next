-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "Address" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "address" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Address_address_key" ON "Address"("address");
