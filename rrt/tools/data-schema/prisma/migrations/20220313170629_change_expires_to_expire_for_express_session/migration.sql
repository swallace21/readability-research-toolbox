/*
  Warnings:

  - You are about to drop the column `expires` on the `UserSessions` table. All the data in the column will be lost.
  - Added the required column `expire` to the `UserSessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserSessions" DROP COLUMN "expires",
ADD COLUMN     "expire" TIMESTAMP(3) NOT NULL;
