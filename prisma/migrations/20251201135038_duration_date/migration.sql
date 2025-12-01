/*
  Warnings:

  - Added the required column `end_date` to the `CheckItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `CheckItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CheckItem" ADD COLUMN     "end_date" TEXT NOT NULL,
ADD COLUMN     "start_date" TEXT NOT NULL;
