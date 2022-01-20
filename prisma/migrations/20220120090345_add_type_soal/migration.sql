/*
  Warnings:

  - You are about to drop the column `sheetId` on the `Soal` table. All the data in the column will be lost.
  - Added the required column `choise` to the `Soal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `correctAnswer` to the `Soal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wrongAnswer` to the `Soal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Soal` DROP FOREIGN KEY `Soal_sheetId_fkey`;

-- AlterTable
ALTER TABLE `Soal` DROP COLUMN `sheetId`,
    ADD COLUMN `choise` VARCHAR(191) NOT NULL,
    ADD COLUMN `correctAnswer` VARCHAR(191) NOT NULL,
    ADD COLUMN `wrongAnswer` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `SoalOnSheet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `sheetId` INTEGER NULL,
    `soalId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TypeSoal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` ENUM('MULTIPLE_CHOICE') NOT NULL DEFAULT 'MULTIPLE_CHOICE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `typeSoalId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SoalOnSheet` ADD CONSTRAINT `SoalOnSheet_sheetId_fkey` FOREIGN KEY (`sheetId`) REFERENCES `Sheet`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SoalOnSheet` ADD CONSTRAINT `SoalOnSheet_soalId_fkey` FOREIGN KEY (`soalId`) REFERENCES `Soal`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TypeSoal` ADD CONSTRAINT `TypeSoal_typeSoalId_fkey` FOREIGN KEY (`typeSoalId`) REFERENCES `Soal`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
