/*
  Warnings:

  - Made the column `status` on table `PurchaseOrder` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `PurchaseOrder` MODIFY `status` ENUM('New', 'Ordered', 'Delivered') NOT NULL DEFAULT 'New';
