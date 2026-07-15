-- AlterTable
ALTER TABLE "User" ADD COLUMN     "targetScore" INTEGER NOT NULL DEFAULT 70,
ADD COLUMN     "testDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "AttemptItem" ADD COLUMN     "confidence" INTEGER;

-- CreateTable
CREATE TABLE "QuestionReview" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "ease" DOUBLE PRECISION NOT NULL DEFAULT 2.5,
    "intervalDays" INTEGER NOT NULL DEFAULT 0,
    "reps" INTEGER NOT NULL DEFAULT 0,
    "lapses" INTEGER NOT NULL DEFAULT 0,
    "dueDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastReviewedAt" TIMESTAMP(3),

    CONSTRAINT "QuestionReview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "QuestionReview_userId_dueDate_idx" ON "QuestionReview"("userId", "dueDate");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionReview_userId_questionId_key" ON "QuestionReview"("userId", "questionId");

-- AddForeignKey
ALTER TABLE "QuestionReview" ADD CONSTRAINT "QuestionReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionReview" ADD CONSTRAINT "QuestionReview_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

