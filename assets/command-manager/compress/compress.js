import zlib from "node:zlib";
import fs from "fs";
import { access, constants } from "node:fs/promises";
import { pipeline } from "stream";
import { promisify } from "util";
import path from "path";

import { ERRORS, COMPRESS } from "../../constants.js";
import { getNormalizedPath } from "../../utils/utils.js";

const pipe = promisify(pipeline);

export async function compress(...params) {
  const [pathToFile, pathToDestination] = params;
  if (!pathToFile || !pathToDestination || params.length > 2) return console.log(ERRORS.INVALID_INPUT);
  try {
    const src = getNormalizedPath(pathToFile);
    await access(src)
      .then(async () => {
        const fileName = path.basename(src) + ".br";
        const dest = path.join(getNormalizedPath(pathToDestination), fileName);
        const readStream = fs.createReadStream(src);
        const writeStream = fs.createWriteStream(dest);
        const transformStream = zlib.createBrotliCompress();

        return await pipe(readStream, transformStream, writeStream)
          .then(() => {
            return console.log(COMPRESS.COMPRESSED);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => {
        console.log(ERRORS.INVALID_FILE_NAME);
      });
  } catch (error) {
    console.log(ERRORS.OPERATION_FAILED);
  }
}

export async function decompress(...params) {
  const [pathToFile, pathToDestination] = params;
  if (!pathToFile || !pathToDestination || params.length > 2) return console.log(ERRORS.INVALID_INPUT);
  try {
    const src = getNormalizedPath(pathToFile);
    await access(src, constants.F_OK | constants.R_OK)
      .then(async () => {
        const fileName = path.basename(src).split(".").slice(0, -1).join(".");
        const dest = getNormalizedPath(pathToDestination + "/" + fileName);
        const readStream = fs.createReadStream(src);
        const writeStream = fs.createWriteStream(dest);
        const transformStream = zlib.createBrotliDecompress();

        return await pipe(readStream, transformStream, writeStream)
          .then(() => {
            return console.log(COMPRESS.DECOMPRESSED);
          })
          .catch((err) => console.error(err));
      })
      .catch(() => {
        console.log(ERRORS.INVALID_FILE_NAME);
      });
  } catch (error) {
    console.log(ERRORS.OPERATION_FAILED);
  }
}
