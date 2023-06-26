import zlib from "node:zlib";
import fs from 'fs';
import { access, constants } from 'node:fs/promises';
import { pipeline } from "stream";
import { promisify } from "util";
import path from "path";

import { ERRORS, COMPRESS } from "../../constants.js";
import { getNormalizedPath } from "../../utils/utils.js";

export async function compress (...params) {
  const [pathToFile, pathToDestination] = params;
  if(!pathToFile || !pathToDestination || params.length > 2) return console.log(ERRORS.INVALID_INPUT);
  try {
    const src = getNormalizedPath(pathToFile);
    const fileName = path.basename(src);
    const dest = getNormalizedPath(pathToDestination + "/" + fileName);
    await access(src, constants.F_OK | constants.R_OK).catch(() => console.log(ERRORS.INVALID_FILE_NAME));
    const pipe = promisify(pipeline);
    const readStream = fs.createReadStream(src);
    const writeStream = fs.createWriteStream(dest);
    const transformStream = zlib.createBrotliCompress();
    await pipe(readStream, transformStream, writeStream);
    console.log(COMPRESS.COMPRESSED);
  } catch (error) {
    throw new Error(error);
  }
}

export async function decompress (...params) {
  const [pathToFile, pathToDestination] = params;
  if(!pathToFile || !pathToDestination || params.length > 2) return console.log(ERRORS.INVALID_INPUT);
  try {
    const src = getNormalizedPath(pathToFile);
    const fileName = path.basename(src);
    const dest = getNormalizedPath(pathToDestination + "/" + fileName);
    await access(src, constants.F_OK | constants.R_OK).catch(() => console.log(ERRORS.INVALID_FILE_NAME));
    const pipe = promisify(pipeline);
    const readStream = fs.createReadStream(src);
    const writeStream = fs.createWriteStream(dest);
    const transformStream = zlib.createBrotliDecompress();
    await pipe(readStream, transformStream, writeStream);
    console.log(COMPRESS.DECOMPRESSED);
  } catch (error) {
    throw new Error(error);
  }
}
