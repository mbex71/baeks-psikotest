/*
  Warnings:

  - You are about to drop the column `typeSoalId` on the `TypeSoal` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `TypeSoal` DROP FOREIGN KEY `TypeSoal_typeSoalId_fkey`;

-- AlterTable
ALTER TABLE `Soal` ADD COLUMN `typeSoalId` INTEGER NULL;

-- AlterTable
ALTER TABLE `TypeSoal` DROP COLUMN `typeSoalId`;

-- AddForeignKey
ALTER TABLE `Soal` ADD CONSTRAINT `Soal_typeSoalId_fkey` FOREIGN KEY (`typeSoalId`) REFERENCES `TypeSoal`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
