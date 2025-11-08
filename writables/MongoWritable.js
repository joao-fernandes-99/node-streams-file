import { Writable } from "stream";

export default class MongoWritable extends Writable {
  constructor(options) {
    super(options);
    this.salesCollection = options.salesCollection;
  }
  async _write(chunk, encoding, callback) {
    try {
      const sale = JSON.parse(chunk.toString());
      await this.salesCollection.insertOne(sale);
      callback(null);
    } catch (error) {
      callback(error);
    }
  }
}