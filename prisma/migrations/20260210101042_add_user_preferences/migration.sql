-- CreateTable
CREATE TABLE "UserPreferences" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "emailNotificationsOrders" BOOLEAN NOT NULL DEFAULT true,
    "emailNotificationsNewsletter" BOOLEAN NOT NULL DEFAULT true,
    "emailNotificationsPromotions" BOOLEAN NOT NULL DEFAULT true,
    "privacyShowProfile" BOOLEAN NOT NULL DEFAULT true,
    "privacyAllowMessages" BOOLEAN NOT NULL DEFAULT true,
    "privacyDataCollection" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserPreferences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPreferences_clerkId_key" ON "UserPreferences"("clerkId");
