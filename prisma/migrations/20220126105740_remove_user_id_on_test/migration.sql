/*
  Warnings:

  - You are about to drop the column `userId` on the `Test` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Test` DROP FOREIGN KEY `Test_userId_fkey`;

-- DropIndex
DROP INDEX `User_username_key` ON `User`;

-- AlterTable
ALTER TABLE `Test` DROP COLUMN `userId`;
