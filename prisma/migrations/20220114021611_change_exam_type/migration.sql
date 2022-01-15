/*
  Warnings:

  - The primary key for the `Test` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `purpose` on the `Test` table. All the data in the column will be lost.
  - You are about to drop the column `registrationNumber` on the `Test` table. All the data in the column will be lost.
  - You are about to drop the column `testDate` on the `Test` table. All the data in the column will be lost.
  - You are about to drop the `Choice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TypeOnTest` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[regNumber]` on the table `Test` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Test` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regNumber` to the `Test` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Choice` DROP FOREIGN KEY `Choice_questionId_fkey`;

-- DropForeignKey
ALTER TABLE `Question` DROP FOREIGN KEY `Question_typeId_fkey`;

-- DropForeignKey
ALTER TABLE `TypeOnTest` DROP FOREIGN KEY `TypeOnTest_testId_fkey`;

-- DropForeignKey
ALTER TABLE `TypeOnTest` DROP FOREIGN KEY `TypeOnTest_typeId_fkey`;

-- DropIndex
DROP INDEX `Test_registrationNumber_key` ON `Test`;

-- AlterTable
ALTER TABLE `Test` DROP PRIMARY KEY,
    DROP COLUMN `purpose`,
    DROP COLUMN `registrationNumber`,
    DROP COLUMN `testDate`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `regNumber` INTEGER NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `User` ADD COLUMN `type` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE `Choice`;

-- DropTable
DROP TABLE `Question`;

-- DropTable
DROP TABLE `Type`;

-- DropTable
DROP TABLE `TypeOnTest`;

-- CreateTable
CREATE TABLE `TestType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `testId` VARCHAR(191) NULL,

    UNIQUE INDEX `TestType_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Test_regNumber_key` ON `Test`(`regNumber`);

-- CreateIndex
CREATE UNIQUE INDEX `Test_userId_key` ON `Test`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `User_name_key` ON `User`(`name`);

-- AddForeignKey
ALTER TABLE `TestType` ADD CONSTRAINT `TestType_testId_fkey` FOREIGN KEY (`testId`) REFERENCES `Test`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
