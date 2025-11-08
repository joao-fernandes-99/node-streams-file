import { Transform } from "stream";

export default class LineSplitterTransform extends Transform {
  _transform(chunk, encoding, callback) {
    this.buffer = (this.buffer || "") + chunk.toString();
    const lines = this.buffer.split(/\r?\n/);
    this.buffer = lines.pop();
    for (const line of lines) {
      this.push(line);
    }
    callback(null);
  }
  _flush(callback) {
    if (this.buffer) {
      this.push(this.buffer);
    }
    callback(null);
  }
}