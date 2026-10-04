import { Storage } from "@google-cloud/storage";

const bucketName = process.env.GCS_BUCKET;

if (!bucketName) {
  throw new Error("GCS_BUCKET is not defined in environment variables");
}

const storage = new Storage();
const bucket = storage.bucket(bucketName);

export async function uploadObject({ key, body, contentType }) {
  await bucket.file(key).save(body, {
    resumable: false,
    metadata: {
      contentType,
    },
  });
}
