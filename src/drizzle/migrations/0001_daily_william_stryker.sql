ALTER TABLE "job_info" ALTER COLUMN "title" SET DATA TYPE varchar(255);
ALTER TABLE "job_info" ALTER COLUMN "title" SET NOT NULL;
ALTER TABLE "job_info" ALTER COLUMN "name" SET DATA TYPE varchar(255);
ALTER TABLE "job_info" ALTER COLUMN "description" SET DATA TYPE varchar(1000);
ALTER TABLE "job_info" ALTER COLUMN "userId" SET DATA TYPE varchar(255);
ALTER TABLE "job_info" ALTER COLUMN "humechatId" SET DATA TYPE varchar(255);
ALTER TABLE "interviews" ALTER COLUMN "duration" SET DATA TYPE varchar(50);
ALTER TABLE "interviews" ALTER COLUMN "humeChatId" SET DATA TYPE varchar(255);
ALTER TABLE "interviews" ALTER COLUMN "feedback" SET DATA TYPE varchar(1000);
ALTER TABLE "job_info" ALTER COLUMN "note" SET DATA TYPE varchar(500);
ALTER TABLE "job_info" DROP COLUMN "experiencelevel";

-- ✅ Fix: change difficulty from ENUM to varchar
ALTER TABLE "questions" ALTER COLUMN "difficulty" SET DATA TYPE varchar(50);
