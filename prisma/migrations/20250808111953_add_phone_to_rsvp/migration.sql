/*
  Warnings:

  - Added the required column `phone` to the `RSVP` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."RSVP" ADD COLUMN     "phone" TEXT NOT NULL;
