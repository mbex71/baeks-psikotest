/*
  Warnings:

  - You are about to alter the column `testId` on the `SoalOnTest` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `Test` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Test` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The required column `registrationCode` was added to the `Test` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE `SoalOnTest` DROP FOREIGN KEY `SoalOnTest_testId_fkey`;

-- AlterTable
ALTER TABLE `SoalOnTest` MODIFY `testId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Test` DROP PRIMARY KEY,
    ADD COLUMN `registrationCode` VARCHAR(191) NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `SoalOnTest` ADD CONSTRAINT `SoalOnTest_testId_fkey` FOREIGN KEY (`testId`) REFERENCES `Test`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
