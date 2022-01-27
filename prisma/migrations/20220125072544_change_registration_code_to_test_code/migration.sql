/*
  Warnings:

  - You are about to drop the column `registrationCode` on the `Test` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[testCode]` on the table `Test` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `testCode` to the `Test` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Test` DROP COLUMN `registrationCode`,
    ADD COLUMN `testCode` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Test_testCode_key` ON `Test`(`testCode`);
