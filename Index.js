import "dotenv/config";
import { promisify } from "util";
import { pipeline } from "stream";
import { MongoClient } from "mongodb";
import R2Service from "./services/R2Service.js";
import MongoWritable from "./writables/MongoWritable.js";
import JsonTransform from "./transforms/JsonTransform.js";
import LineSplitterTransform from "./transforms/LineSplitterTransform.js";

const pipelineAsync = promisify(pipeline);

async function run() {
  const r2Service = new R2Service();
  const bucket = process.env.R2_DEFAULT_BUCKET;
  const mongoClient = new MongoClient(process.env.MONGODB_ATLAS_URI);
  try {
    await mongoClient.connect();
    console.log('MongoDB connected');
    
    const object = await r2Service.getObjectById({
      bucket,
      fileId: "sales.csv",
    });
    
    const database = mongoClient.db(process.env.DATABASE);
    const sales = database.collection("sales");
    
    const jsonTransform = new JsonTransform({ decodeStrings: false });
    const lineSplitterTransform = new LineSplitterTransform();
    const mongoWriter = new MongoWritable({ salesCollection: sales });

    const startDate = new Date().toISOString();
    console.log(`start_date ${startDate}`);

    await pipelineAsync(
      object.Body,
      lineSplitterTransform,
      jsonTransform,
      mongoWriter
    );
    return;
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
  } finally {
    await mongoClient.close();
    console.log(`finish_date ${new Date().toISOString()}`);
  }
}

(async () => {
  return await run();
})();
