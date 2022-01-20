/*
  Warnings:

  - You are about to drop the column `testTypeId` on the `Sheet` table. All the data in the column will be lost.
  - You are about to drop the column `correctAnswer` on the `Soal` table. All the data in the column will be lost.
  - You are about to drop the column `wrongAnswer` on the `Soal` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `TypeSoal` table. The data in that column could be lost. The data in that column will be cast from `Enum("TypeSoal_name")` to `Enum("TypeSoal_name")`.
  - You are about to drop the `TestType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Sheet` DROP FOREIGN KEY `Sheet_testTypeId_fkey`;

-- DropForeignKey
ALTER TABLE `TestType` DROP FOREIGN KEY `TestType_testId_fkey`;

-- AlterTable
ALTER TABLE `Sheet` DROP COLUMN `testTypeId`,
    ADD COLUMN `testId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Soal` DROP COLUMN `correctAnswer`,
    DROP COLUMN `wrongAnswer`;

-- AlterTable
ALTER TABLE `TypeSoal` MODIFY `name` ENUM('ANGKA', 'HURUF', 'SYMBOL') NOT NULL;

-- DropTable
DROP TABLE `TestType`;

-- CreateTable
CREATE TABLE `Jawaban` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `answers` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `soalOnSheetId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Options` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `correctAnswer` VARCHAR(191) NOT NULL,
    `wrongAnswer` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `soalId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Sheet` ADD CONSTRAINT `Sheet_testId_fkey` FOREIGN KEY (`testId`) REFERENCES `Test`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jawaban` ADD CONSTRAINT `Jawaban_soalOnSheetId_fkey` FOREIGN KEY (`soalOnSheetId`) REFERENCES `SoalOnSheet`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Options` ADD CONSTRAINT `Options_soalId_fkey` FOREIGN KEY (`soalId`) REFERENCES `Soal`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
