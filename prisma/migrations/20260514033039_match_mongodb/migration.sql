-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "persona" TEXT,
    "fileURL" TEXT NOT NULL,
    "fileBlobKey" TEXT NOT NULL,
    "coverURL" TEXT,
    "coverBlobKey" TEXT,
    "fileSize" INTEGER NOT NULL,
    "totalSegments" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookSegment" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "segmentIndex" INTEGER NOT NULL,
    "pageNumber" INTEGER,
    "wordCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BookSegment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VoiceSession" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),
    "durationSeconds" INTEGER NOT NULL DEFAULT 0,
    "billingPeriodStart" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VoiceSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Book_slug_key" ON "Book"("slug");

-- CreateIndex
CREATE INDEX "Book_clerkId_idx" ON "Book"("clerkId");

-- CreateIndex
CREATE INDEX "Book_slug_idx" ON "Book"("slug");

-- CreateIndex
CREATE INDEX "BookSegment_clerkId_idx" ON "BookSegment"("clerkId");

-- CreateIndex
CREATE INDEX "BookSegment_bookId_idx" ON "BookSegment"("bookId");

-- CreateIndex
CREATE INDEX "BookSegment_bookId_pageNumber_idx" ON "BookSegment"("bookId", "pageNumber");

-- CreateIndex
CREATE UNIQUE INDEX "BookSegment_bookId_segmentIndex_key" ON "BookSegment"("bookId", "segmentIndex");

-- CreateIndex
CREATE INDEX "VoiceSession_clerkId_idx" ON "VoiceSession"("clerkId");

-- CreateIndex
CREATE INDEX "VoiceSession_bookId_idx" ON "VoiceSession"("bookId");

-- CreateIndex
CREATE INDEX "VoiceSession_billingPeriodStart_idx" ON "VoiceSession"("billingPeriodStart");

-- CreateIndex
CREATE INDEX "VoiceSession_clerkId_billingPeriodStart_idx" ON "VoiceSession"("clerkId", "billingPeriodStart");

-- AddForeignKey
ALTER TABLE "BookSegment" ADD CONSTRAINT "BookSegment_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoiceSession" ADD CONSTRAINT "VoiceSession_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
