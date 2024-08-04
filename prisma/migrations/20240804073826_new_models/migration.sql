-- CreateTable
CREATE TABLE "Coupon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "category" TEXT NOT NULL DEFAULT 'all',
    "code" TEXT NOT NULL,
    "expiredTime" DATETIME,
    "amount" INTEGER NOT NULL DEFAULT 1
);

-- CreateTable
CREATE TABLE "ClaimedCoupon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "claimerId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "couponId" INTEGER NOT NULL,
    CONSTRAINT "ClaimedCoupon_claimerId_fkey" FOREIGN KEY ("claimerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ClaimedCoupon_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "Coupon" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
