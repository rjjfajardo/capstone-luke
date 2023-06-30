import { S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "ap-southeast-1",
  credentials: {
    accessKeyId: "AKIATA2LHAQHRS3FCM7V",
    secretAccessKey: "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",
  },
});

export { s3Client };
