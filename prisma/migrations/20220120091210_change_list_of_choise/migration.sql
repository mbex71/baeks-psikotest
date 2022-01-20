/*
  Warnings:

  - You are about to drop the column `choise` on the `Soal` table. All the data in the column will be lost.
  - Added the required column `listOfChoise` to the `Soal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Soal` DROP COLUMN `choise`,
    ADD COLUMN `listOfChoise` VARCHAR(191) NOT NULL;
