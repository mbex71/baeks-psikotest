/*
  Warnings:

  - Made the column `userId` on table `Test` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Test` DROP FOREIGN KEY `Test_userId_fkey`;

-- AlterTable
ALTER TABLE `Test` MODIFY `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Test` ADD CONSTRAINT `Test_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
