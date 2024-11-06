-- CreateTable
CREATE TABLE "data" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "last" TEXT NOT NULL,
    "buy" TEXT NOT NULL,
    "sell" TEXT NOT NULL,
    "volume" TEXT NOT NULL,
    "base_unit" INTEGER NOT NULL,

    CONSTRAINT "data_pkey" PRIMARY KEY ("id")
);
