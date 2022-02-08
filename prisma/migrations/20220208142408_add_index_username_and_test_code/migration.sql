-- DropForeignKey
ALTER TABLE `Jawaban` DROP FOREIGN KEY `Jawaban_optionsId_fkey`;

-- DropForeignKey
ALTER TABLE `Jawaban` DROP FOREIGN KEY `Jawaban_soalOnTestId_fkey`;

-- DropForeignKey
ALTER TABLE `Options` DROP FOREIGN KEY `Options_soalId_fkey`;

-- DropForeignKey
ALTER TABLE `Soal` DROP FOREIGN KEY `Soal_typeSoalId_fkey`;

-- DropForeignKey
ALTER TABLE `SoalOnTest` DROP FOREIGN KEY `SoalOnTest_soalId_fkey`;

-- DropForeignKey
ALTER TABLE `SoalOnTest` DROP FOREIGN KEY `SoalOnTest_testId_fkey`;

-- DropForeignKey
ALTER TABLE `Test` DROP FOREIGN KEY `Test_accountId_fkey`;

-- AlterTable
ALTER TABLE `Test` MODIFY `status` ENUM('ACTIVE', 'ONGOING', 'DONE', 'SUCCESS', 'FAILED') NOT NULL DEFAULT 'ACTIVE';

-- CreateIndex
CREATE INDEX `Account_username_idx` ON `Account`(`username`);

-- CreateIndex
CREATE INDEX `Test_testCode_idx` ON `Test`(`testCode`);
