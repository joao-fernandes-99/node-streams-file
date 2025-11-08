import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import "dotenv/config";

export default class R2Service {
  constructor() {
    this.s3Client = new S3Client({
      region: process.env.R2_REGION,
      endpoint: process.env.R2_ENDPOINT,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
      },
    });
  }

  async getObjectById({ bucket, fileId }) {
    try {
      const response = await this.s3Client.send(
        new GetObjectCommand({
          Bucket: bucket,
          Key: fileId,
        })
      );
      return response;
    } catch (error) {
      console.error(`R2Service.getObjectById ${bucket}-${fileId}: ${error}`);
      throw new Error(
        "An error ocurred while trying recovery file, please try again later."
      );
    }
  }
}
