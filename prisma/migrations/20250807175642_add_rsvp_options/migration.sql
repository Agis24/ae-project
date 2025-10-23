/*
  Warnings:

  - Added the required column `attendance` to the `RSVP` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."RSVP" ADD COLUMN     "attendance" TEXT NOT NULL,
ADD COLUMN     "diet" TEXT,
ADD COLUMN     "message" TEXT;
