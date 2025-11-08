import { Transform } from "stream";
import headers from "../util/Headers.js";

export default class JsonTransform extends Transform {
  _transform(chunk, encoding, callback) {
    const lines = chunk?.toString("utf-8").split(",");
    const chunkSerialized = {};
    if (!lines.includes(headers[0])) {
      for (let i = 0; i < lines.length; i++) {
        chunkSerialized[headers[i]] = lines[i];
      }
      this.push(JSON.stringify(chunkSerialized));
    }
    callback(null);
  }
}
