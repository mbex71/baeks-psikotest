/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `SoalOnTest` MODIFY `time` INTEGER NOT NULL DEFAULT 60000;

-- CreateIndex
CREATE UNIQUE INDEX `Account_username_key` ON `Account`(`username`);
