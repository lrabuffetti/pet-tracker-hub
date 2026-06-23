-- CreateTable
CREATE TABLE `Pet` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `type` ENUM('DOG', 'CAT', 'OTHER') NOT NULL,
    `breed` VARCHAR(191) NULL,
    `birthdate` DATETIME(3) NULL,
    `weight` DOUBLE NULL,
    `gender` ENUM('MALE', 'FEMALE') NULL,
    `avatarUrl` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Pet_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MedicalRecord` (
    `id` VARCHAR(191) NOT NULL,
    `petId` VARCHAR(191) NOT NULL,
    `type` ENUM('VACCINE', 'DEWORMING', 'CHECKUP', 'SURGERY', 'MEDICATION') NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `notes` VARCHAR(191) NULL,
    `date` DATETIME(3) NOT NULL,
    `nextDueDate` DATETIME(3) NULL,
    `veterinarian` VARCHAR(191) NULL,
    `attachmentUrl` VARCHAR(191) NULL,
    `weightAtTime` DOUBLE NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `MedicalRecord_petId_idx`(`petId`),
    INDEX `MedicalRecord_nextDueDate_idx`(`nextDueDate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pet` ADD CONSTRAINT `Pet_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MedicalRecord` ADD CONSTRAINT `MedicalRecord_petId_fkey` FOREIGN KEY (`petId`) REFERENCES `Pet`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
