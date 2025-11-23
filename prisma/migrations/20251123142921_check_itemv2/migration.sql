/*
  Warnings:

  - You are about to drop the `item` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."item";

-- CreateTable
CREATE TABLE "CheckItem" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "imgUrl" TEXT,
    "period" TEXT NOT NULL,
    "target_period" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "CheckItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CheckItem" ADD CONSTRAINT "CheckItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
