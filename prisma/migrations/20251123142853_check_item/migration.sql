-- CreateTable
CREATE TABLE "item" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "imgUrl" TEXT,
    "period" TEXT NOT NULL,
    "target_period" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "item_pkey" PRIMARY KEY ("id")
);
