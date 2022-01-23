/*
  Warnings:

  - You are about to drop the column `soalOnSheetId` on the `Jawaban` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `Test` table. The data in that column could be lost. The data in that column will be cast from `Enum("Test_status")` to `Enum("Test_status")`.
  - You are about to drop the `Sheet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SoalOnSheet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Jawaban` DROP FOREIGN KEY `Jawaban_soalOnSheetId_fkey`;

-- DropForeignKey
ALTER TABLE `Sheet` DROP FOREIGN KEY `Sheet_testId_fkey`;

-- DropForeignKey
ALTER TABLE `SoalOnSheet` DROP FOREIGN KEY `SoalOnSheet_sheetId_fkey`;

-- DropForeignKey
ALTER TABLE `SoalOnSheet` DROP FOREIGN KEY `SoalOnSheet_soalId_fkey`;

-- AlterTable
ALTER TABLE `Jawaban` DROP COLUMN `soalOnSheetId`,
    ADD COLUMN `soalOnTestId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Test` MODIFY `status` ENUM('ACTIVE', 'ONGOING', 'SUCCESS', 'FAILED') NOT NULL DEFAULT 'ACTIVE';

-- DropTable
DROP TABLE `Sheet`;

-- DropTable
DROP TABLE `SoalOnSheet`;

-- CreateTable
CREATE TABLE `SoalOnTest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `soalId` INTEGER NULL,
    `testId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SoalOnTest` ADD CONSTRAINT `SoalOnTest_soalId_fkey` FOREIGN KEY (`soalId`) REFERENCES `Soal`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SoalOnTest` ADD CONSTRAINT `SoalOnTest_testId_fkey` FOREIGN KEY (`testId`) REFERENCES `Test`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jawaban` ADD CONSTRAINT `Jawaban_soalOnTestId_fkey` FOREIGN KEY (`soalOnTestId`) REFERENCES `SoalOnTest`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
