import { S3Client } from "@aws-sdk/client-s3";

export const S3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    }
})

export const BUCKET_NAME = process.env.S3_BUCKET_ID;