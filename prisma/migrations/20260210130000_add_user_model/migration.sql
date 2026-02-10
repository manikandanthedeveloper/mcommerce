-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "phoneNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- Update Cart table
ALTER TABLE "Cart" RENAME COLUMN "numberOfItemsInCart" TO "numItemsInCart";
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_clerkId_key" UNIQUE ("clerkId");

-- Update CartItem table
ALTER TABLE "CartItem" RENAME COLUMN "quantity" TO "amount";
