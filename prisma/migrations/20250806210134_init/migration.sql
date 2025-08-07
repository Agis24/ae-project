-- CreateTable
CREATE TABLE "public"."RSVP" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "guests" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RSVP_pkey" PRIMARY KEY ("id")
);
