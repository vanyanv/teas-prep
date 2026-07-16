-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "rationale" JSONB;

-- AlterTable
ALTER TABLE "QuestionReview" ADD COLUMN     "saved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "savedAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "QuestionReview_userId_saved_idx" ON "QuestionReview"("userId", "saved");
