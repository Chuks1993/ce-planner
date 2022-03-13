/*
  Warnings:

  - Added the required column `msid` to the `Reminder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reminder" ADD COLUMN     "msid" TEXT NOT NULL;
