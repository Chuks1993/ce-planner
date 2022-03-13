/*
  Warnings:

  - The primary key for the `PhoneNumber` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `PhoneNumber` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PhoneNumber" DROP CONSTRAINT "PhoneNumber_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "PhoneNumber_pkey" PRIMARY KEY ("number");
